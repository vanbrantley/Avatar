import { observable, action, makeObservable } from 'mobx';
import { CreateGarmentInput, CreateGarmentMutation, CreatePaletteInput, CreatePaletteMutation, CreateComplexionInput, CreateComplexionMutation, DeleteGarmentInput, DeleteGarmentMutation, DeletePaletteInput, DeletePaletteMutation, Garment, ListGarmentsQuery, ListPalettesQuery, Palette, ListComplexionsQuery, UpdateComplexionInput, UpdateComplexionMutation, UpdateGarmentInput, UpdateGarmentMutation, CreateOutfitInput, CreateOutfitMutation, DeleteOutfitInput, DeleteOutfitMutation, ListOutfitsQuery } from '@/API';
import groupByArea from '../lib/groupByArea';
import { API, Auth } from 'aws-amplify';
import { GraphQLQuery, GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listGarments, listPalettes, listComplexions, listOutfits } from '../graphql/queries';
import { createGarment, createPalette, createComplexion, deleteGarment, deletePalette, updateComplexion, updateGarment, createOutfit, deleteOutfit } from '../graphql/mutations';
import { CognitoUser } from '@aws-amplify/auth';
import { Layout, Mode, GarmentType, GarmentTypeStrings, EmbeddedOutfit } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';

import { Outfit } from '../lib/types';

class AppStore {

    // state variables

    defaultHat: Garment = {
        __typename: "Garment",
        id: uuidv4(),
        area: GarmentTypeStrings[GarmentType.Hat],
        color: "#000000",
        brand: "",
        name: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: null
    }

    defaultTop: Garment = {
        __typename: "Garment",
        id: uuidv4(),
        area: GarmentTypeStrings[GarmentType.Top],
        color: "#ffffff",
        brand: "",
        name: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: null
    }

    defaultBottom: Garment = {
        __typename: "Garment",
        id: uuidv4(),
        area: GarmentTypeStrings[GarmentType.Bottom],
        color: "#5687b8",
        brand: "",
        name: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: null
    }

    defaultShoe: Garment = {
        __typename: "Garment",
        id: uuidv4(),
        area: GarmentTypeStrings[GarmentType.Shoe],
        color: "#000000",
        brand: "",
        name: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: null
    }

    selectedHat = this.defaultHat;
    selectedTop = this.defaultTop;
    selectedBottom = this.defaultBottom;
    selectedShoe = this.defaultShoe;

    hatColor = this.selectedHat.color;
    faceColor = "#a18057";
    topColor = this.selectedTop.color;
    bottomColor = this.selectedBottom.color;
    shoeColor = this.selectedShoe.color;

    // hatColor = "#000000";
    // faceColor = "#a18057";
    // topColor = "#ffffff";
    // bottomColor = "#5687b8";
    // shoeColor = "#000000";

    selectedGarment: Garment | null = null;

    userHats: Garment[] = [];
    userTops: Garment[] = [];
    userBottoms: Garment[] = [];
    userShoes: Garment[] = [];

    selectedCategory: GarmentType = GarmentType.Top;
    selectedColor = this.topColor; // stores color picker's color

    hatLock = false;
    topLock = false;
    bottomLock = false;
    shoeLock = false;

    // hatIds: ["8f14b75d-ef5e-46c2-a5ae-e1b4e22c9cd7", "b0290ed2-1dc9-4cb0-bd4b-2b31306a5137", "c943d6c1-6785-497c-89b6-b8e256c53d67"]
    // topIds: ["caf6842b-6fec-4b11-9778-f84496712170", "3bc067cf-77f6-402c-9aa9-5238c88e985c", "33758603-cd1f-4cad-bd40-937b5d3141a6", "e584dcc2-ca58-4fe7-a6ef-eef7d0084516"]
    // bottomIds: ["69dba41a-b6d9-4135-86ff-364da1ff7e42", "6db99140-7f9f-4001-8880-b50233f3e1ec", "74631079-f840-41ec-a001-ff1fe649fd0e"]
    // shoeIds: ["3a89eaed-c61a-4705-bd20-ae370b104b90", "027f95ae-44ec-4598-991f-8988c2234d74", "ab45da44-cdbe-4371-acf2-7d32f5a2c73e"]

    outfits: Outfit[] = [];
    embeddedOutfits: EmbeddedOutfit[] = [];
    selectedOutfit: EmbeddedOutfit | null = null;

    palettes: Palette[] = [];
    selectedPalette = "";

    navbarOpen = false;
    colorPickerOpen = false;
    heartFilled = false;

    showAvatar = true;
    showPicker = true;
    showHelp = false;
    showOnboard = false;

    mode: Mode = Mode.Closet;
    layout: Layout = Layout.Desktop;

    user: CognitoUser | null = null;

    constructor() {

        makeObservable(this, {

            // state variables + their setters
            hatColor: observable,
            faceColor: observable,
            topColor: observable,
            bottomColor: observable,
            shoeColor: observable,
            selectedHat: observable,
            selectedTop: observable,
            selectedBottom: observable,
            selectedShoe: observable,
            selectedGarment: observable,
            userHats: observable,
            userTops: observable,
            userBottoms: observable,
            userShoes: observable,
            selectedCategory: observable,
            selectedColor: observable,
            hatLock: observable,
            topLock: observable,
            bottomLock: observable,
            shoeLock: observable,
            outfits: observable,
            embeddedOutfits: observable,
            selectedOutfit: observable,
            palettes: observable,
            selectedPalette: observable,
            navbarOpen: observable,
            colorPickerOpen: observable,
            heartFilled: observable,
            showAvatar: observable,
            showPicker: observable,
            showHelp: observable,
            showOnboard: observable,
            mode: observable,
            layout: observable,
            user: observable

        });

    }

    // setter functions
    setHatColor = action((color: string) => {
        this.hatColor = color;
    });

    setFaceColor = action((color: string) => {
        this.faceColor = color;
    });

    setTopColor = action((color: string) => {
        this.topColor = color;
    });

    setBottomColor = action((color: string) => {
        this.bottomColor = color;
    });

    setShoeColor = action((color: string) => {
        this.shoeColor = color;
    });

    setSelectedHat = action((selected: Garment) => {
        this.selectedHat = selected;
    });

    setSelectedTop = action((selected: Garment) => {
        this.selectedTop = selected;
    });

    setSelectedBottom = action((selected: Garment) => {
        this.selectedBottom = selected;
    });

    setSelectedShoe = action((selected: Garment) => {
        this.selectedShoe = selected;
    });

    setSelectedGarment = action((garment: Garment | null) => {
        this.selectedGarment = garment;
    });

    setUserHats = action((hats: Garment[]) => {
        this.userHats = hats;
    });

    setUserTops = action((tops: Garment[]) => {
        this.userTops = tops;
    });

    setUserBottoms = action((bottoms: Garment[]) => {
        this.userBottoms = bottoms;
    });

    setUserShoes = action((shoes: Garment[]) => {
        this.userShoes = shoes;
    });

    setSelectedCategory = action((category: GarmentType) => {
        this.selectedCategory = category;
    });

    setSelectedColor = action((color: string) => {
        this.selectedColor = color;
    });

    setHatLock = action((locked: boolean) => {
        this.hatLock = locked;
    });

    setTopLock = action((locked: boolean) => {
        this.topLock = locked;
    });

    setBottomLock = action((locked: boolean) => {
        this.bottomLock = locked;
    });

    setShoeLock = action((locked: boolean) => {
        this.shoeLock = locked;
    });

    setOutfits = action((outfits: Outfit[]) => {
        this.outfits = outfits;
    });

    setEmbeddedOutfits = action((embeddedOutfits: EmbeddedOutfit[]) => {
        this.embeddedOutfits = embeddedOutfits;
    });

    setSelectedOutfit = action((embeddedOutfit: EmbeddedOutfit | null) => {
        this.selectedOutfit = embeddedOutfit;
        if (embeddedOutfit) {
            const { hat, top, bottom, shoe } = embeddedOutfit;
            this.setSelectedHat(hat);
            this.setSelectedTop(top);
            this.setSelectedBottom(bottom);
            this.setSelectedShoe(shoe);
        }
    });

    setPalettes = action((palettes: Palette[]) => {
        this.palettes = palettes;
    });

    setSelectedPalette = action((id: string) => {
        this.selectedPalette = id;
    });

    setNavbarOpen = action((isOpen: boolean) => {
        this.navbarOpen = isOpen;
    });

    setColorPickerOpen = action((isOpen: boolean) => {
        this.colorPickerOpen = isOpen;
    });

    setHeartFilled = action((filled: boolean) => {
        this.heartFilled = filled;
    });

    setShowAvatar = action((show: boolean) => {
        this.showAvatar = show;
    });

    setShowPicker = action((show: boolean) => {
        this.showPicker = show;
    });

    setShowHelp = action((show: boolean) => {
        this.showHelp = show;
    });

    setShowOnboard = action((show: boolean) => {
        this.showOnboard = show;
    });

    setMode = action((mode: Mode) => {
        this.mode = mode;
    });

    setLayout = action((layout: Layout) => {
        this.layout = layout;
    });

    setUser = action((user: CognitoUser | null) => {
        this.user = user;
    });

    // functions

    handleModeChange = action((newMode: Mode) => {

        // if you aren't changing mdoes, don't do anything
        if (newMode === this.mode) return;

        this.setMode(newMode);
        this.setNavbarOpen(false);

        // if the layout is mobile, set showAvatar to false
        if (this.layout === Layout.Mobile) this.setShowAvatar(false);

    });

    handleAreaChange = action((area: GarmentType) => {

        this.setSelectedCategory(area);

        switch (area) {
            case GarmentType.Hat:
                this.setSelectedColor(this.selectedHat.color);
                break;
            case GarmentType.Top:
                this.setSelectedColor(this.selectedTop.color);
                break;
            case GarmentType.Bottom:
                this.setSelectedColor(this.selectedBottom.color);
                break;
            case GarmentType.Shoe:
                this.setSelectedColor(this.selectedShoe.color);
                break;
        }
    });

    // checkAreaLock = (area: string) => {
    //     switch (area) {
    //         case "hat":
    //             return this.hatLock;
    //         case "top":
    //             return this.topLock;
    //         case "bottom":
    //             return this.bottomLock;
    //         case "shoe":
    //             return this.shoeLock;
    //         default:
    //             return false;
    //     }
    // };

    handleColorChangePicker = action((color: string) => {

        // lock logic is commented out

        // if its heartFilled and the area you're trying to change is not locked
        // const isAreaLocked = this.checkAreaLock(this.selectedArea);
        // if (this.heartFilled && !isAreaLocked) this.setHeartFilled(false);

        // if (!isAreaLocked) {

        switch (this.selectedCategory) {
            case GarmentType.Hat:
                this.setHatColor(color);
                break;
            // case "face":
            //     this.setFaceColor(color);
            //     // update complexion in DB
            //     if (this.user) this.updateDBComlpexion(color);
            //     break;
            case GarmentType.Top:
                this.setTopColor(color);
                break;
            case GarmentType.Bottom:
                this.setBottomColor(color);
                break;
            case GarmentType.Shoe:
                this.setShoeColor(color);
                break;
            default:
                break;
        };

        this.setSelectedColor(color);

        // }
    });

    handleBackButtonClick = action(() => {
        this.setMode(Mode.Closet);
        this.setColorPickerOpen(false);
    });

    handlePlusButtonClick = action(() => {
        this.setMode(Mode.Add);
        this.setColorPickerOpen(true);
    });

    handleUpdateGarmentButtonClick = action((brand: string, name: string) => {

        if (this.selectedGarment) {

            const { id, area } = this.selectedGarment;
            this.updateGarmentToDB(id, area, this.selectedColor, brand, name);
            this.handleModeChange(Mode.Closet);
            this.setColorPickerOpen(false);

        }

    });

    handleGarmentClick = action((garment: Garment) => {

        const { area, color } = garment;

        // switch based on garment's area

        switch (area) {

            case GarmentTypeStrings[GarmentType.Hat]:
                this.setSelectedHat(garment);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                this.setSelectedTop(garment);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                this.setSelectedBottom(garment);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                this.setSelectedShoe(garment);
                break;
            default:
                break;
        }

        this.setSelectedColor(color);
        this.checkIfSavedOutfit();

    });

    openGarmentDetails = action((garment: Garment) => {

        // set garment to its area's selected garment
        switch (garment.area) {

            case GarmentTypeStrings[GarmentType.Hat]:
                this.setSelectedHat(garment);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                this.setSelectedTop(garment);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                this.setSelectedBottom(garment);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                this.setSelectedShoe(garment);
                break;
            default:
                break;
        }

        // set selectedGarment
        this.setSelectedGarment(garment);

        // change mode to Details
        this.setMode(Mode.Details);
        this.setColorPickerOpen(true);

    });

    updateDBComlpexion = action(async (newComplexion: string) => {

        try {
            const username = this.user?.getUsername();
            const complexionDetails: UpdateComplexionInput = {
                id: username!,
                complexion: newComplexion
            };

            await API.graphql<GraphQLQuery<UpdateComplexionMutation>>(graphqlOperation(updateComplexion, {
                input: complexionDetails
            })) as GraphQLResult<UpdateComplexionMutation>;

        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }

    });

    handleSwatchClick = action((garment: Garment) => {

        switch (garment.area) {
            case GarmentTypeStrings[GarmentType.Hat]:
                this.setSelectedHat(garment);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                this.setSelectedTop(garment);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                this.setSelectedBottom(garment);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                this.setSelectedShoe(garment);
                break;
        }

        this.checkIfSavedOutfit();

    })

    // depreceated - can be removed - replaced by handleSwatchClick ^
    handleColorChangeSwatch = action((color: string, area: GarmentType) => {

        // const isAreaLocked = this.checkAreaLock(area);

        // if (!isAreaLocked) {

        // 

        switch (area) {
            case GarmentType.Hat:
                this.setHatColor(color);
                break;
            // case "face":
            //     this.setFaceColor(color);
            //     break;
            case GarmentType.Top:
                this.setTopColor(color);
                break;
            case GarmentType.Bottom:
                this.setBottomColor(color);
                break;
            case GarmentType.Shoe:
                this.setShoeColor(color);
                break;
            default:
                break;
        }

        this.setSelectedCategory(area);
        this.setSelectedColor(color);

        // }


    });

    assignAreaColorsFromPalette = action((hatColor: string, topColor: string, bottomColor: string, shoeColor: string, id: string) => {


        const allAreasLocked = this.hatLock && this.topLock && this.bottomLock && this.shoeLock;
        if (allAreasLocked) return;

        // set area color to the palette color if it is not locked
        if (!this.hatLock) this.setHatColor(hatColor);
        if (!this.topLock) this.setTopColor(topColor);
        if (!this.bottomLock) this.setBottomColor(bottomColor);
        if (!this.shoeLock) this.setShoeColor(shoeColor);


        // assign selectedColor to the color of the selectedArea in the palette
        // const isAreaLocked = this.checkAreaLock(this.selectedArea);
        // if (!isAreaLocked) {

        switch (this.selectedCategory) {
            case GarmentType.Hat:
                this.setSelectedColor(hatColor);
                break;
            // case "face":
            //     break;
            case GarmentType.Top:
                this.setSelectedColor(topColor);
                break;
            case GarmentType.Bottom:
                this.setSelectedColor(bottomColor);
                break;
            case GarmentType.Shoe:
                this.setSelectedColor(shoeColor);
                break;
            default:
                break;
        }

        // }

        const anyAreaLocked = this.hatLock || this.topLock || this.bottomLock || this.shoeLock;

        // a locked area stops us from assigning all area colors - thus palette isn't one that we've saved
        if (anyAreaLocked && (this.selectedPalette !== id)) this.setHeartFilled(false);
        else {
            this.setHeartFilled(true);
            this.setSelectedPalette(id);
        }

    });

    // Randomly select IDs from userGarments for each category
    getRandomGarment = (garments: Garment[]) => {
        const randomIndex = Math.floor(Math.random() * garments.length);
        return garments[randomIndex] || '';
    };

    fetchGarmentsFromDB = action(async (): Promise<Garment[]> => {
        try {
            const response = (await API.graphql<GraphQLQuery<ListGarmentsQuery>>(graphqlOperation(listGarments))) as GraphQLResult<ListGarmentsQuery>;
            const { data } = response;
            if (data && data.listGarments && data.listGarments.items) {
                const userGarments = data.listGarments.items as Garment[];
                const grouped = groupByArea(userGarments);
                this.setUserHats(grouped["hat"]);
                this.setUserTops(grouped["top"]);
                this.setUserBottoms(grouped["bottom"]);
                this.setUserShoes(grouped["shoe"]);

                // Assign random garment IDs to selected variables
                // set selectedColor 
                if (this.userHats.length !== 0) {
                    const randomHat = this.getRandomGarment(this.userHats);
                    this.setSelectedHat(randomHat);
                }

                if (this.userTops.length !== 0) {
                    const randomTop = this.getRandomGarment(this.userTops);
                    this.setSelectedTop(randomTop);
                    this.setSelectedColor(randomTop.color);
                }

                if (this.userBottoms.length !== 0) {
                    const randomBottom = this.getRandomGarment(this.userBottoms);
                    this.setSelectedBottom(randomBottom);
                    this.setSelectedColor(randomBottom.color);
                }

                if (this.userShoes.length !== 0) {
                    const randomShoe = this.getRandomGarment(this.userShoes);
                    this.setSelectedShoe(randomShoe);
                    this.setSelectedColor(randomShoe.color);
                }

                switch (this.selectedCategory) {
                    case GarmentType.Hat:
                        this.setSelectedColor(this.selectedHat.color);
                        break;
                    case GarmentType.Top:
                        this.setSelectedColor(this.selectedTop.color);
                        break;
                    case GarmentType.Bottom:
                        this.setSelectedColor(this.selectedBottom.color);
                        break;
                    case GarmentType.Shoe:
                        this.setSelectedColor(this.selectedShoe.color);
                        break;
                }

                this.fetchOutfits();

                return userGarments;
            } else {
                throw new Error("Could not get garments");
            }
        } catch (error: any) {
            throw new Error("Could not get garments");
        }
    });

    addGarmentLocal = action((area: GarmentType, color: string, brand: string, name: string) => {

        if (!name) {
            name = color + " " + brand + " " + GarmentTypeStrings[area]
        }

        // make a Garment Object with placeholder data for id, createdAt, updatedAt, owner
        const newGarment: Garment = {
            __typename: "Garment",
            id: uuidv4(),
            area: GarmentTypeStrings[area],
            color: color,
            brand: brand,
            name: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: null
        }

        // add createdGarment to user garment group
        switch (area) {
            case GarmentType.Hat:
                this.setUserHats([newGarment, ...this.userHats]);
                break;
            case GarmentType.Top:
                this.setUserTops([newGarment, ...this.userTops]);
                break;
            case GarmentType.Bottom:
                this.setUserBottoms([newGarment, ...this.userBottoms]);
                break;
            case GarmentType.Shoe:
                this.setUserShoes([newGarment, ...this.userShoes]);
                break;
        }

    });

    addGarmentToDB = action(async (area: GarmentType, color: string, brand: string, name: string) => {
        try {

            // handle case when passed name is the empty string
            if (!name) {
                name = color + " " + brand + " " + GarmentTypeStrings[area]
            }

            const createNewGarmentInput: CreateGarmentInput = {
                color: color,
                area: GarmentTypeStrings[area],
                brand: brand,
                name: name
            };

            const response = await API.graphql<GraphQLQuery<CreateGarmentMutation>>(graphqlOperation(createGarment, {
                input: createNewGarmentInput
            })) as GraphQLResult<CreateGarmentMutation>;
            const { data } = response;
            if (data && data.createGarment) {
                const createdGarment = data.createGarment;
                // add createdGarment to user garment group
                // make createdGarmnet the selected area garment
                switch (area) {
                    case GarmentType.Hat:
                        this.setUserHats([createdGarment, ...this.userHats]);
                        this.setSelectedHat(createdGarment);
                        break;
                    case GarmentType.Top:
                        this.setUserTops([createdGarment, ...this.userTops]);
                        this.setSelectedTop(createdGarment);
                        break;
                    case GarmentType.Bottom:
                        this.setUserBottoms([createdGarment, ...this.userBottoms]);
                        this.setSelectedBottom(createdGarment);
                        break;
                    case GarmentType.Shoe:
                        this.setUserShoes([createdGarment, ...this.userShoes]);
                        this.setSelectedShoe(createdGarment);
                        break;
                }

                console.log("Garment added successfully: ", createdGarment);
            } else {
                throw new Error("Could not add garment")
            }

        } catch (error: any) {
            console.error("Error adding garment: ", error);
        }
    });

    updateGarmentToDB = action(async (id: string, area: string, color: string, brand: string, name: string) => {

        try {

            if (!name) {
                name = color + " " + brand + " " + area
            }

            const updateGarmentInput: UpdateGarmentInput = {
                id: id,
                color: color,
                area: area,
                brand: brand,
                name: name
            };

            const response = await API.graphql<GraphQLQuery<UpdateGarmentMutation>>(graphqlOperation(updateGarment, {
                input: updateGarmentInput
            })) as GraphQLResult<UpdateGarmentMutation>;
            const { data } = response;
            if (data && data.updateGarment) {
                const updatedGarment = data.updateGarment as Garment;
                console.log("Garment updated successfully: ", updatedGarment);

                // update the garment in the userGarments area state array
                // update the selected area garment

                let updatedArray: Garment[];
                switch (area) {
                    case GarmentTypeStrings[GarmentType.Hat]:
                        updatedArray = [
                            updatedGarment,
                            ...(this.userHats.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserHats(updatedArray);
                        this.setSelectedHat(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Top]:
                        updatedArray = [
                            updatedGarment,
                            ...(this.userTops.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserTops(updatedArray);
                        this.setSelectedTop(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Bottom]:
                        updatedArray = [
                            updatedGarment,
                            ...(this.userBottoms.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserBottoms(updatedArray);
                        this.setSelectedBottom(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Shoe]:
                        updatedArray = [
                            updatedGarment,
                            ...(this.userShoes.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserShoes(updatedArray);
                        this.setSelectedShoe(updatedGarment);
                        break;
                }

            } else {
                throw new Error("Could not update garment")
            }

        } catch (error: any) {
            console.error("Error updating garment: ", error);
        }

    });

    removeGarment = action(async (garmentId: string, area: string) => {
        try {
            const garmentDetails: DeleteGarmentInput = {
                id: garmentId,
            };

            const response = await API.graphql<GraphQLQuery<DeleteGarmentMutation>>(graphqlOperation(deleteGarment, {
                input: garmentDetails
            })) as GraphQLResult<DeleteGarmentMutation>;
            const { data } = response;

            if (data && data.deleteGarment) {
                const removedGarment = data.deleteGarment;

                // remove removedGarment from garments array
                // reset selected area garment

                switch (area) {
                    case GarmentTypeStrings[GarmentType.Hat]:
                        this.setUserHats(this.userHats.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userHats.length === 0) {
                            this.setSelectedHat(this.defaultHat);
                        } else {
                            const randomHat = this.getRandomGarment(this.userHats);
                            this.setSelectedHat(randomHat);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Top]:
                        this.setUserTops(this.userTops.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userTops.length === 0) {
                            this.setSelectedTop(this.defaultTop);
                        } else {
                            const randomTop = this.getRandomGarment(this.userTops);
                            this.setSelectedTop(randomTop);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Bottom]:
                        this.setUserBottoms(this.userBottoms.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userBottoms.length === 0) {
                            this.setSelectedBottom(this.defaultBottom);
                        } else {
                            const randomBottom = this.getRandomGarment(this.userBottoms);
                            this.setSelectedBottom(randomBottom);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Shoe]:
                        this.setUserShoes(this.userShoes.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userShoes.length === 0) {
                            this.setSelectedShoe(this.defaultShoe);
                        } else {
                            const randomShoe = this.getRandomGarment(this.userShoes);
                            this.setSelectedShoe(randomShoe);
                        }
                        break;
                }

                console.log("Garment removed successfully: ", removedGarment);

                // TODO: Cascade delete outfits containing that garment
                const outfitsToDelete = this.outfits.filter((outfit) => outfit[`${removedGarment.area}Id` as keyof Outfit] === removedGarment.id);

                for (const outfitToDelete of outfitsToDelete) {
                    await this.removeOutfit(outfitToDelete.id);
                }



            }

        } catch (error: any) {
            console.error("Error removing palette: ", error);
        }
    });

    populateEmbeddedOutfits = (outfits: Outfit[]) => {

        let embeddedOutfits: EmbeddedOutfit[] = [];

        for (const outfit of outfits) {

            // TODO: maybe make whats in this for loop a function too -- because it is also done in saveOutfit

            const { id, hatId, topId, bottomId, shoeId } = outfit;

            const hatGarment = this.userHats.find((hat) => hat.id === hatId);
            const topGarment = this.userTops.find((top) => top.id === topId);
            const bottomGarment = this.userBottoms.find((bottom) => bottom.id === bottomId);
            const shoeGarment = this.userShoes.find((shoe) => shoe.id === shoeId);

            if (!hatGarment || !topGarment || !bottomGarment || !shoeGarment) {
                console.warn('Skipping outfit because one or more garments are undefined');
                continue;
            }

            const embeddedOutfit: EmbeddedOutfit = {
                id: id,
                hat: hatGarment,
                top: topGarment,
                bottom: bottomGarment,
                shoe: shoeGarment
            }

            embeddedOutfits = [...embeddedOutfits, embeddedOutfit];

        }

        // console.log("Embedded Outfits: ", embeddedOutfits);
        this.setEmbeddedOutfits(embeddedOutfits);

    }

    fetchOutfits = action(async (): Promise<Outfit[]> => {

        try {
            const response = (await API.graphql<GraphQLQuery<ListOutfitsQuery>>(graphqlOperation(listOutfits))) as GraphQLResult<ListOutfitsQuery>;
            const { data } = response;
            if (data && data.listOutfits && data.listOutfits.items) {

                const userOutfits = data.listOutfits.items as Outfit[];
                this.setOutfits(userOutfits);
                this.populateEmbeddedOutfits(userOutfits);
                return userOutfits;

            } else {
                throw new Error("Could not get outfits");
            }
        } catch (error: any) {
            throw new Error("Could not get outfits");
        }

    });

    donOutfit = action((outfit: EmbeddedOutfit) => {

        // set id to new selectedOutfit state variable to handle deletion
        const { hat, top, bottom, shoe } = outfit;

        this.setSelectedHat(hat);
        this.setSelectedTop(top);
        this.setSelectedBottom(bottom);
        this.setSelectedShoe(shoe);

        this.setSelectedOutfit(outfit);

        // update selectedColor
        switch (this.selectedCategory) {
            case GarmentType.Hat:
                this.setSelectedColor(this.selectedHat.color);
                break;
            case GarmentType.Top:
                this.setSelectedColor(this.selectedTop.color);
                break;
            case GarmentType.Bottom:
                this.setSelectedColor(this.selectedBottom.color);
                break;
            case GarmentType.Shoe:
                this.setSelectedColor(this.selectedShoe.color);
                break;
        }

        // should bake the logic somewhere else or package that with something else so you don't have to 
        // wonder if you need to do it or not
        // or make an action that updates the selectedColor - switch based on selectedCategory, sets selectedColor to 
        // color of selected garment of that category. Nice.

        // wait it actually seems to be working fine without you updating the selectedColor here, seems to be updated
        // when you go to edit, not add.

    });

    cycleOutfitsLeft = action(() => {

        // selectedOutfit can be null, or can be an embeddedOutfit
        if (this.selectedOutfit) {
            const { id } = this.selectedOutfit;
            // if it's not null, get the index of the selectedOutfit in embeddedOutfits
            const selectedOutfitIndex = this.embeddedOutfits.findIndex(outfit => outfit.id === id);
            if (selectedOutfitIndex !== -1) {
                // subtract one from index or set to last if it is first one
                const leftIndex = (selectedOutfitIndex === 0) ? this.embeddedOutfits.length - 1 : selectedOutfitIndex - 1;
                // make embeddedOutfits[i] the seletedOutfit and set the selectedGarments
                this.setSelectedOutfit(this.embeddedOutfits[leftIndex]);
                // set the selected garments to the parts of the embedded outfit

            } else console.warn('Selected outfit not found in embeddedOutfits');
        } else {
            // if it's null, pick a random index from embeddedOutfits.length
            // make embeddedOutfits[i] the seletedOutfit and set the selectedGarments
            const randomIndex = Math.floor(Math.random() * this.embeddedOutfits.length);
            const randomOutfit = this.embeddedOutfits[randomIndex];
            this.setSelectedOutfit(randomOutfit);
        }

    })

    cycleOutfitsRight = action(() => {

        // selectedOutfit can be null, or can be an embeddedOutfit
        if (this.selectedOutfit) {
            const { id } = this.selectedOutfit;
            // if it's not null, get the index of the selectedOutfit in embeddedOutfits
            const selectedOutfitIndex = this.embeddedOutfits.findIndex(outfit => outfit.id === id);
            if (selectedOutfitIndex !== -1) {
                // add one to the index or set to 0 if its last one
                const rightIndex = (selectedOutfitIndex === this.embeddedOutfits.length - 1) ? 0 : selectedOutfitIndex + 1;
                // make embeddedOutfits[i] the seletedOutfit and set the selectedGarments
                this.setSelectedOutfit(this.embeddedOutfits[rightIndex]);
                // set the selected garments to the parts of the embedded outfit

            } else console.warn('Selected outfit not found in embeddedOutfits');
        } else {
            // if it's null, pick a random index from embeddedOutfits.length
            // make embeddedOutfits[i] the seletedOutfit and set the selectedGarments
            const randomIndex = Math.floor(Math.random() * this.embeddedOutfits.length);
            const randomOutfit = this.embeddedOutfits[randomIndex];
            this.setSelectedOutfit(randomOutfit);
        }

    });

    createOutfitHash = (hatId: string, topId: string, bottomId: string, shoeId: string) => {
        return `${hatId}-${topId}-${bottomId}-${shoeId}`;
    }

    checkIfSavedOutfit = action(() => {

        // make hash for current garments
        const currentOutfitHash = this.createOutfitHash(this.selectedHat.id, this.selectedTop.id, this.selectedBottom.id, this.selectedShoe.id);

        // make hashes for saved outfits
        let savedOutfitHashes: string[] = [];

        for (const outfit of this.embeddedOutfits) {

            const { hat, top, bottom, shoe } = outfit;
            const outfitHash = this.createOutfitHash(hat.id, top.id, bottom.id, shoe.id);
            savedOutfitHashes = [...savedOutfitHashes, outfitHash];

        }

        // check currentOutfitHas against all of the savedOutfitHashes
        const index = savedOutfitHashes.indexOf(currentOutfitHash);

        // if match is found, get the matched embeddedOutfit's id, set it to the selectedOutfit
        if (index !== -1) {

            // Match found, get the corresponding embeddedOutfit
            const selectedEmbeddedOutfit = this.embeddedOutfits[index];

            // set it to the selectedOutfit
            this.setSelectedOutfit(selectedEmbeddedOutfit);

        } else {
            if (this.selectedOutfit) this.setSelectedOutfit(null);
        }

    });

    saveOutfit = action(async () => {

        try {

            // create CreateOutfitInput object with ids of selected garments
            const createNewOutfitInput: CreateOutfitInput = {
                hatId: this.selectedHat.id,
                topId: this.selectedTop.id,
                bottomId: this.selectedBottom.id,
                shoeId: this.selectedShoe.id
            }

            // add it to the database
            const response = await API.graphql<GraphQLQuery<CreateOutfitMutation>>(graphqlOperation(createOutfit, {
                input: createNewOutfitInput
            })) as GraphQLResult<CreateOutfitMutation>;
            const { data } = response;

            // make embeddedOutfit object from createdOutfit & add it to otufits, embeddedOutfits
            // set selectedOutfit to the newly created embeddedOutfit
            if (data && data.createOutfit) {
                const createdOutfit = data.createOutfit;
                const { id, hatId, topId, bottomId, shoeId } = createdOutfit;

                const hatGarment = this.userHats.find((hat) => hat.id === hatId);
                const topGarment = this.userTops.find((top) => top.id === topId);
                const bottomGarment = this.userBottoms.find((bottom) => bottom.id === bottomId);
                const shoeGarment = this.userShoes.find((shoe) => shoe.id === shoeId);

                if (!hatGarment || !topGarment || !bottomGarment || !shoeGarment) {
                    console.warn('Skipping outfit because one or more garments are undefined');
                    return;
                }

                const embeddedOutfit: EmbeddedOutfit = {
                    id: id,
                    hat: hatGarment,
                    top: topGarment,
                    bottom: bottomGarment,
                    shoe: shoeGarment
                }

                this.setOutfits([...this.outfits, createdOutfit]);
                this.setEmbeddedOutfits([...this.embeddedOutfits, embeddedOutfit]);
                this.setSelectedOutfit(embeddedOutfit);

                console.log("Outfit added successfully: ", createdOutfit);

            } else {
                throw new Error("Could not save palette.");
            }

        } catch (error: any) {
            console.error("Error adding palette: ", error);
        }

    });

    removeOutfit = action(async (outfitId: string) => {

        try {

            const outfitDetails: DeleteOutfitInput = {
                id: outfitId,
            };

            const response = await API.graphql<GraphQLQuery<DeleteOutfitMutation>>(graphqlOperation(deleteOutfit, {
                input: outfitDetails
            })) as GraphQLResult<DeleteOutfitMutation>;
            const { data } = response;

            if (data && data.deleteOutfit) {
                const removedOutfit = data.deleteOutfit;
                this.setSelectedOutfit(null);
                this.setOutfits(this.outfits.filter((outfit) => outfit.id !== removedOutfit.id));
                this.setEmbeddedOutfits(this.embeddedOutfits.filter((outfit) => outfit.id !== removedOutfit.id));
                console.log("Outfit removed successfully: ", removedOutfit);
            }

        } catch (error: any) {
            console.error("Error removing palette: ", error);
        }

    });

    fetchPalettes = action(async (): Promise<Palette[]> => {
        try {
            const response = await API.graphql<GraphQLQuery<ListPalettesQuery>>(graphqlOperation(listPalettes)) as GraphQLResult<ListPalettesQuery>;
            const { data } = response;
            if (data && data.listPalettes && data.listPalettes.items) {
                const userPalettes = data.listPalettes.items as Palette[];
                // setPalettes to the hatColor, topColor, bottomColor, shoeColor
                this.setPalettes(userPalettes);
                return userPalettes;
            } else {
                throw new Error("Could not get palettes.");
            }
        } catch (error: any) {
            console.error(error);
            throw new Error("Could not get palettes");
        }
    });

    savePalette = action(async () => {
        try {

            const createNewPaletteInput: CreatePaletteInput = {
                hatColor: this.hatColor,
                topColor: this.topColor,
                bottomColor: this.bottomColor,
                shoeColor: this.shoeColor
            };

            const response = await API.graphql<GraphQLQuery<CreatePaletteMutation>>(graphqlOperation(createPalette, {
                input: createNewPaletteInput
            })) as GraphQLResult<CreatePaletteMutation>;
            const { data } = response;

            if (data && data.createPalette) {
                const createdPalette = data.createPalette;
                this.setPalettes([createdPalette, ...this.palettes]);
                this.setSelectedPalette(createdPalette.id);
                this.setHeartFilled(true);
                console.log("Palette added successfully: ", createdPalette);

            } else {
                throw new Error("Could not save palette.");
            }
        } catch (error: any) {
            console.error("Error adding palette: ", error);
        }
    });

    removePalette = action(async () => {
        try {
            const paletteDetails: DeletePaletteInput = {
                id: this.selectedPalette!,
            };

            const response = await API.graphql<GraphQLQuery<DeletePaletteMutation>>(graphqlOperation(deletePalette, {
                input: paletteDetails
            })) as GraphQLResult<DeletePaletteMutation>;
            const { data } = response;

            if (data && data.deletePalette) {
                const removedPalette = data.deletePalette;
                this.setPalettes(this.palettes.filter((palette) => palette.id !== removedPalette.id));
                this.setSelectedPalette("");
                this.setHeartFilled(false);
                console.log("Palette removed successfully: ", removedPalette);
            }

        } catch (error: any) {
            console.error("Error removing palette: ", error);
        }
    });

    initializeComplexion = action(async (username: string) => {

        try {

            const createNewComplexionInput: CreateComplexionInput = {
                id: username,
                complexion: this.faceColor
            };

            const response = await API.graphql<GraphQLQuery<CreateComplexionMutation>>(graphqlOperation(createComplexion, {
                input: createNewComplexionInput
            })) as GraphQLResult<CreateComplexionMutation>;
            const { data } = response;
            console.log(data);
        } catch (error: any) {
            console.error("Error adding palette: ", error);
        }

    });

    fetchComplexion = action(async (username: string) => {

        // console.log("Fetch complexion for: ", username);

        try {
            const response = await API.graphql<GraphQLQuery<ListComplexionsQuery>>(graphqlOperation(listComplexions)) as GraphQLResult<ListComplexionsQuery>;
            const { data } = response;
            if (data && data.listComplexions && data.listComplexions.items) {
                const complexion = data.listComplexions.items[0]?.complexion;
                if (complexion !== this.faceColor) this.setFaceColor(complexion!);
            } else {
                throw new Error("Could not get complexion.");
            }
        } catch (error: any) {
            console.error(error);
            throw new Error("Could not get complexion");
        }
    });

    signUserOut = action(async () => {

        // Clear the access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        try {

            await Auth.signOut();

            // handle clean-up

            this.setUser(null);
            if (this.hatLock) this.setHatLock(false);
            if (this.topLock) this.setTopLock(false);
            if (this.bottomLock) this.setBottomLock(false);
            if (this.shoeLock) this.setShoeLock(false);

            this.setSelectedCategory(GarmentType.Top);
            this.setSelectedColor(this.topColor);

            this.setSelectedHat(this.defaultHat);
            this.setSelectedTop(this.defaultTop);
            this.setSelectedBottom(this.defaultBottom);
            this.setSelectedShoe(this.defaultShoe);
            this.setSelectedOutfit(null);


            this.setUserHats([]);
            this.setUserTops([]);
            this.setUserBottoms([]);
            this.setUserShoes([]);

            this.setPalettes([]);
            // this.handleModeChange(Mode.Closet);

        } catch (error) {
            console.log('Sign-out error:', error);
        }
    });
}

const appStore = new AppStore();
export default appStore;

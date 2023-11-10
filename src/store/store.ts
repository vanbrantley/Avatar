import { observable, action, makeObservable } from 'mobx';
import { CreateGarmentInput, CreateGarmentMutation, CreatePaletteInput, CreatePaletteMutation, CreateComplexionInput, CreateComplexionMutation, DeleteGarmentInput, DeleteGarmentMutation, DeletePaletteInput, DeletePaletteMutation, Garment, ListGarmentsQuery, ListPalettesQuery, Palette, ListComplexionsQuery, UpdateComplexionInput, UpdateComplexionMutation, UpdateGarmentInput, UpdateGarmentMutation } from '@/API';
import groupByArea from '../lib/groupByArea';
import { API, Auth } from 'aws-amplify';
import { GraphQLQuery, GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listGarments, listPalettes, listComplexions } from '../graphql/queries';
import { createGarment, createPalette, createComplexion, deleteGarment, deletePalette, updateComplexion, updateGarment } from '../graphql/mutations';
import { CognitoUser } from '@aws-amplify/auth';
import { Layout, Mode, GarmentType, GarmentTypeStrings } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';

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

    palettes: Palette[] = [];
    selectedPalette = "";

    navbarOpen = false;
    colorPickerOpen = false;
    heartFilled = false;

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
            palettes: observable,
            selectedPalette: observable,
            navbarOpen: observable,
            colorPickerOpen: observable,
            heartFilled: observable,
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

    });

    handleAreaChange = action((area: GarmentType) => {
        this.setSelectedCategory(area);

        switch (area) {
            case GarmentType.Hat:
                this.setSelectedColor(this.selectedHat.color);
                break;
            // case "face":
            //     this.setSelectedColor(this.faceColor);
            //     break;
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
                    case "hat":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userHats.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserHats(updatedArray);
                        this.setSelectedHat(updatedGarment);
                        break;
                    case "top":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userTops.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserTops(updatedArray);
                        this.setSelectedTop(updatedGarment);
                        break;
                    case "bottom":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userBottoms.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserBottoms(updatedArray);
                        this.setSelectedBottom(updatedGarment);
                        break;
                    case "shoe":
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
                    case "hat":
                        this.setUserHats(this.userHats.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userHats.length === 0) {
                            this.setSelectedHat(this.defaultHat);
                        } else {
                            const randomHat = this.getRandomGarment(this.userHats);
                            this.setSelectedHat(randomHat);
                        }
                        break;
                    case "top":
                        this.setUserTops(this.userTops.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userTops.length === 0) {
                            this.setSelectedTop(this.defaultTop);
                        } else {
                            const randomTop = this.getRandomGarment(this.userTops);
                            this.setSelectedTop(randomTop);
                        }
                        break;
                    case "bottom":
                        this.setUserBottoms(this.userBottoms.filter((swatch) => swatch.id !== removedGarment.id));
                        if (this.userBottoms.length === 0) {
                            this.setSelectedBottom(this.defaultBottom);
                        } else {
                            const randomBottom = this.getRandomGarment(this.userBottoms);
                            this.setSelectedBottom(randomBottom);
                        }
                        break;
                    case "shoe":
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
            this.handleModeChange(Mode.Closet);

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


            this.setUserHats([]);
            this.setUserTops([]);
            this.setUserBottoms([]);
            this.setUserShoes([]);

            this.setPalettes([]);

        } catch (error) {
            console.log('Sign-out error:', error);
        }
    });
}

const appStore = new AppStore();
export default appStore;

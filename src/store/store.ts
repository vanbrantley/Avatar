import { observable, action, makeObservable } from 'mobx';
import {
    CreateGarmentInput, CreateGarmentMutation, CreateComplexionInput, CreateComplexionMutation, DeleteGarmentInput,
    DeleteGarmentMutation, Garment, ListGarmentsQuery, ListComplexionsQuery, UpdateComplexionInput,
    UpdateComplexionMutation, UpdateGarmentInput, UpdateGarmentMutation, CreateOutfitInput, CreateOutfitMutation,
    DeleteOutfitInput, DeleteOutfitMutation, ListOutfitsQuery
} from '@/API';
import groupByArea from '../lib/groupByArea';
import { API, Auth } from 'aws-amplify';
import { GraphQLQuery, GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listGarments, listComplexions, listOutfits } from '../graphql/queries';
import { createGarment, createComplexion, deleteGarment, updateComplexion, updateGarment, createOutfit, deleteOutfit } from '../graphql/mutations';
import { CognitoUser } from '@aws-amplify/auth';
import { Layout, Mode, GarmentType, GarmentTypeStrings, Outfit, EmbeddedOutfit } from '../lib/types';
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

    selectedGarment: Garment = this.defaultTop;

    userHats: Garment[] = [];
    userTops: Garment[] = [];
    userBottoms: Garment[] = [];
    userShoes: Garment[] = [];

    // OG complexion #a18057
    complexions: string[] = ["#f5ebe4", "#ecdacc", "#e3c8b4",
        "#d3aa8a", "#cd9d79", "#c08355",
        "#a66b3d", "#885732", "#714829",
        "#53351e", "#3b2616", "#23160d"];
    selectedComplexion = Math.floor(Math.random() * this.complexions.length);
    faceColor = this.complexions[this.selectedComplexion];

    selectedCategory: GarmentType = GarmentType.Top;
    selectedColor = this.selectedTop.color; // color picker's color

    outfits: Outfit[] = [];
    embeddedOutfits: EmbeddedOutfit[] = [];
    selectedOutfit: EmbeddedOutfit | null = null;

    navbarOpen = false;
    colorPickerOpen = false;
    showAvatar = true;
    showPicker = true;
    showHelp = false;
    showOnboard = false;

    mode: Mode = Mode.Closet;
    layout: Layout = Layout.Desktop;
    user: CognitoUser | null = null;

    errorMessage: string | null = null;
    showErrorMessage = false;
    successMessage: string | null = null;
    showSuccessMessage = false;

    hatLock = false;
    topLock = false;
    bottomLock = false;
    shoeLock = false;


    constructor() {

        makeObservable(this, {

            // state variables + their setters
            faceColor: observable,
            selectedHat: observable,
            selectedTop: observable,
            selectedBottom: observable,
            selectedShoe: observable,
            selectedGarment: observable,
            userHats: observable,
            userTops: observable,
            userBottoms: observable,
            userShoes: observable,
            complexions: observable,
            selectedComplexion: observable,
            selectedCategory: observable,
            selectedColor: observable,
            hatLock: observable,
            topLock: observable,
            bottomLock: observable,
            shoeLock: observable,
            outfits: observable,
            embeddedOutfits: observable,
            selectedOutfit: observable,
            navbarOpen: observable,
            colorPickerOpen: observable,
            showAvatar: observable,
            showPicker: observable,
            showHelp: observable,
            showOnboard: observable,
            mode: observable,
            layout: observable,
            user: observable,
            errorMessage: observable,
            showErrorMessage: observable,
            successMessage: observable,
            showSuccessMessage: observable
        });

    }

    // setter functions

    setFaceColor = action((color: string) => {
        this.faceColor = color;
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

    setSelectedGarment = action((garment: Garment) => {
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

    setSelectedComplexion = action((index: number) => {
        this.selectedComplexion = index;
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

    setNavbarOpen = action((isOpen: boolean) => {
        this.navbarOpen = isOpen;
    });

    setColorPickerOpen = action((isOpen: boolean) => {
        this.colorPickerOpen = isOpen;
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

    setErrorMessage = action((message: string | null) => {
        this.errorMessage = message;
    });

    setShowErrorMessage = action((show: boolean) => {
        this.showErrorMessage = show;
    });

    setSuccessMessage = action((message: string | null) => {
        this.successMessage = message;
    });

    setShowSuccessMessage = action((show: boolean) => {
        this.showSuccessMessage = show;
    });

    // functions

    dismissErrorMessage = action(() => {
        this.setShowErrorMessage(false);
        this.setErrorMessage(null);
    });

    setErrorMessageHandler = action((message: string) => {
        this.setErrorMessage(message);
        this.setShowErrorMessage(true);
    });

    dismissSuccessMessage = action(() => {
        this.setShowSuccessMessage(false);
        this.setSuccessMessage(null);
    });

    setSuccessMessageHandler = action((message: string) => {
        this.setSuccessMessage(message);
        this.setShowSuccessMessage(true);
    });

    handleModeChange = action((newMode: Mode) => {

        // if you aren't changing mdoes, don't do anything
        if (this.layout === Layout.Desktop && newMode === this.mode) return;

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

    handleAvatarClickMobile = action((area: GarmentType) => {

        this.handleAreaChange(area);
        this.setShowAvatar(false);
        this.setMode(Mode.Closet);

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

        this.setSelectedColor(color);

    });

    handleBackButtonClick = action(() => {
        this.setMode(Mode.Closet);
        this.setColorPickerOpen(false);
    });

    handlePlusButtonClick = action(() => {
        this.setMode(Mode.Add);
        this.setColorPickerOpen(true);
    });

    handleUpdateGarmentButtonClick = action((brand: string | undefined, name: string) => {

        const { id, area } = this.selectedGarment;
        this.updateGarmentToDB(id, area, this.selectedColor, brand, name);
        this.handleModeChange(Mode.Closet);
        this.setColorPickerOpen(false);

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

        // set selectedGarment
        this.setSelectedGarment(garment);
        this.setSelectedColor(garment.color);

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

        // change mode to Details
        this.setMode(Mode.Details);
        this.setColorPickerOpen(true);

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

    });

    // Randomly select IDs from userGarments for each category
    getRandomGarment = (garments: Garment[]) => {
        const randomIndex = Math.floor(Math.random() * garments.length);
        return garments[randomIndex] || '';
    };

    randomizeGarments = action(() => {

        if (this.userHats.length > 1) {
            const randomHat = this.getRandomGarment(this.userHats);
            this.setSelectedHat(randomHat);
        }

        if (this.userTops.length > 1) {
            const randomTop = this.getRandomGarment(this.userTops);
            this.setSelectedTop(randomTop);
            this.setSelectedColor(randomTop.color);
        }

        if (this.userBottoms.length > 1) {
            const randomBottom = this.getRandomGarment(this.userBottoms);
            this.setSelectedBottom(randomBottom);
            this.setSelectedColor(randomBottom.color);
        }

        if (this.userShoes.length > 1) {
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

        this.checkIfSavedOutfit();

    });

    fetchGarments = action(async (): Promise<Garment[]> => {
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
                }

                if (this.userBottoms.length !== 0) {
                    const randomBottom = this.getRandomGarment(this.userBottoms);
                    this.setSelectedBottom(randomBottom);
                }

                if (this.userShoes.length !== 0) {
                    const randomShoe = this.getRandomGarment(this.userShoes);
                    this.setSelectedShoe(randomShoe);
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
                throw new Error("Error fetching garments");
            }
        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error fetching garments");
            throw error;
        }
    });

    addGarmentLocal = action((area: GarmentType, color: string, brand: string | undefined, name: string) => {

        const normalizedBrand = (brand === undefined || brand === '') ? null : brand;

        // make a Garment Object with placeholder data for id, createdAt, updatedAt, owner
        const newGarment: Garment = {
            __typename: "Garment",
            id: uuidv4(),
            area: GarmentTypeStrings[area],
            color: color,
            brand: normalizedBrand,
            name: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: null
        }

        // add createdGarment to user garment group
        switch (area) {
            case GarmentType.Hat:
                this.setUserHats([newGarment, ...this.userHats]);
                this.setSelectedHat(newGarment);
                break;
            case GarmentType.Top:
                this.setUserTops([newGarment, ...this.userTops]);
                this.setSelectedTop(newGarment);
                break;
            case GarmentType.Bottom:
                this.setUserBottoms([newGarment, ...this.userBottoms]);
                this.setSelectedBottom(newGarment);
                break;
            case GarmentType.Shoe:
                this.setUserShoes([newGarment, ...this.userShoes]);
                this.setSelectedShoe(newGarment);
                break;
        }

    });

    addGarmentToDB = action(async (area: GarmentType, color: string, brand: string | undefined, name: string) => {
        try {

            const normalizedBrand = (brand === undefined || brand === '') ? null : brand;

            const createNewGarmentInput: CreateGarmentInput = {
                color: color,
                area: GarmentTypeStrings[area],
                brand: normalizedBrand,
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

                this.setSuccessMessageHandler("Garment added successfully");
            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error adding garment");
            throw error;
        }
    });

    updateGarmentToDB = action(async (id: string, area: string, color: string, brand: string | undefined, name: string) => {

        try {

            const normalizedBrand = (brand === undefined || brand === '') ? null : brand;

            const updateGarmentInput: UpdateGarmentInput = {
                id: id,
                color: color,
                area: area,
                brand: normalizedBrand,
                name: name
            };

            const response = await API.graphql<GraphQLQuery<UpdateGarmentMutation>>(graphqlOperation(updateGarment, {
                input: updateGarmentInput
            })) as GraphQLResult<UpdateGarmentMutation>;
            const { data } = response;
            if (data && data.updateGarment) {
                const updatedGarment = data.updateGarment as Garment;

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

                this.setSuccessMessageHandler("Garment updated successfully");

            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error updating garment");
            throw error;
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

                this.setSuccessMessageHandler("Garment removed successfully");

                const outfitsToDelete = this.outfits.filter((outfit) => outfit[`${removedGarment.area}Id` as keyof Outfit] === removedGarment.id);

                for (const outfitToDelete of outfitsToDelete) {
                    await this.removeOutfit(outfitToDelete.id);
                }

            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error removing garment");
            throw error;
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
                throw new Error("Error fetching user outfits");
            }
        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error fetching user outfits");
            throw error;
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

            // check for case where you go to make an outfit with a default garment
            // if there is a default garment, add it to the database for the user & get its id
            // think you have to change it so that the addGarment function returns the createdGarment -- yea

            // check all areas to see if the garments are in the database (see if any are default garments)
            // save the area garment ids to variables
            // if there are default garments, make a garment for it in the db, and save its id to the variable
            // make the CreateOutfitInput


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
                    console.warn('Garment not found for outfit');
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

                this.setSuccessMessageHandler("Outfit added successfully");

            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error saving outfit");
            throw error;
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
                this.setSuccessMessageHandler("Outfit removed successfully");
            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error removing outfit");
            throw error;
        }

    });

    initializeComplexion = action(async (username: string) => {

        try {

            const createNewComplexionInput: CreateComplexionInput = {
                id: username,
                complexion: this.faceColor
            };

            await API.graphql<GraphQLQuery<CreateComplexionMutation>>(graphqlOperation(createComplexion, {
                input: createNewComplexionInput
            })) as GraphQLResult<CreateComplexionMutation>;

        } catch (error: any) {
            this.setErrorMessageHandler("Error setting user's complexion");
            console.error(error);
        }

    });

    fetchComplexion = action(async () => {

        try {
            const response = await API.graphql<GraphQLQuery<ListComplexionsQuery>>(graphqlOperation(listComplexions)) as GraphQLResult<ListComplexionsQuery>;
            const { data } = response;

            if (data && data.listComplexions && data.listComplexions.items) {
                const complexion = data.listComplexions.items[0]?.complexion;
                if (complexion !== this.faceColor) this.setFaceColor(complexion!);
                // TODO: Set selectedComplexion
            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error fetching complexion");
            throw new error;
        }
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

            this.setSuccessMessageHandler("Complexion updated successfully");

        } catch (error) {
            console.error(error);
            this.setErrorMessageHandler('Error updating complexion');
            throw error;
        }

    });

    updateComplexion = action((complexion: string) => {
        this.setFaceColor(complexion);
        this.updateDBComlpexion(complexion);
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
            this.setSelectedGarment(this.defaultTop);

            this.setSelectedHat(this.defaultHat);
            this.setSelectedTop(this.defaultTop);
            this.setSelectedBottom(this.defaultBottom);
            this.setSelectedShoe(this.defaultShoe);
            this.setSelectedOutfit(null);
            this.setSelectedColor(this.selectedTop.color);

            this.setUserHats([]);
            this.setUserTops([]);
            this.setUserBottoms([]);
            this.setUserShoes([]);

            this.setSuccessMessageHandler("User signed out successfully");

        } catch (error) {
            console.error(error);
            this.setErrorMessageHandler('Error signing user out');
            throw error;
        }
    });
}

const appStore = new AppStore();
export default appStore;
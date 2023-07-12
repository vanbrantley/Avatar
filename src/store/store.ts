import { observable, action, makeObservable } from 'mobx';
import { CreateGarmentInput, CreateGarmentMutation, CreatePaletteInput, CreatePaletteMutation, DeleteGarmentInput, DeleteGarmentMutation, DeletePaletteInput, DeletePaletteMutation, Garment, ListGarmentsQuery, ListPalettesQuery, Palette } from '@/API';
import groupByArea from '@/lib/groupByArea';
import { API, Storage, Auth } from 'aws-amplify';
import { GraphQLQuery, GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listGarments, listPalettes } from '@/graphql/queries';
import { createGarment, createPalette, deleteGarment, deletePalette } from '@/graphql/mutations';
import { SwatchObject } from '@/lib/types';

class AppStore {

    // state variables
    hatColor = "#000000";
    faceColor = "#a18057";
    topColor = "#ffffff";
    bottomColor = "#000000";
    shoeColor = "#000000";

    selectedArea = "top";
    selectedColor = this.topColor;

    shirts: string[] = [];
    selectedShirt = "";

    hatSwatches: SwatchObject[] = [];
    topSwatches: SwatchObject[] = [];
    bottomSwatches: SwatchObject[] = [];
    shoeSwatches: SwatchObject[] = [];

    hatLock = false;
    topLock = false;
    bottomLock = false;
    shoeLock = false;

    palettes: Palette[] = [];
    selectedPalette = "";

    navbarOpen = false;

    heartFilled = false;

    showPicker = true;

    mode = "lab";
    layout = "desktop";

    constructor() {

        makeObservable(this, {

            // state variables + their setters
            hatColor: observable,
            faceColor: observable,
            topColor: observable,
            bottomColor: observable,
            shoeColor: observable,
            selectedArea: observable,
            selectedColor: observable,
            shirts: observable,
            selectedShirt: observable,
            hatSwatches: observable,
            topSwatches: observable,
            bottomSwatches: observable,
            shoeSwatches: observable,
            hatLock: observable,
            topLock: observable,
            bottomLock: observable,
            shoeLock: observable,
            palettes: observable,
            selectedPalette: observable,
            navbarOpen: observable,
            heartFilled: observable,
            showPicker: observable,
            mode: observable,
            layout: observable

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

    setSelectedArea = action((area: string) => {
        this.selectedArea = area;
    });

    setSelectedColor = action((color: string) => {
        this.selectedColor = color;
    });

    addShirt = action((filePath: string) => {
        this.shirts.push(filePath);
    });

    setShirts = action((shirts: string[]) => {
        this.shirts = shirts;
    });

    setSelectedShirt = action((shirtPath: string) => {
        this.selectedShirt = shirtPath;
    });

    setHatSwatches = action((swatches: SwatchObject[]) => {
        this.hatSwatches = swatches;
    });

    setTopSwatches = action((swatches: SwatchObject[]) => {
        this.topSwatches = swatches;
    });

    setBottomSwatches = action((swatches: SwatchObject[]) => {
        this.bottomSwatches = swatches;
    });

    setShoeSwatches = action((swatches: SwatchObject[]) => {
        this.shoeSwatches = swatches;
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

    setHeartFilled = action((filled: boolean) => {
        this.heartFilled = filled;
    });

    setShowPicker = action((show: boolean) => {
        this.showPicker = show;
    });

    setMode = action((mode: string) => {
        this.mode = mode;
    });

    setLayout = action((layout: string) => {
        this.layout = layout;
    });

    displayMockupOnAvatar = action((imagePath: string) => {

        // setSelectedShirt to path
        this.setSelectedShirt(imagePath);

        if (!this.topLock) this.setTopLock(true);

        this.setTopColor('transparent');

    });

    fetchShirts = action(async () => {
        try {

            const currentUser = await Auth.currentAuthenticatedUser();
            const userId = currentUser.getUsername() ?? ''; // Provide a default value if `getUsername()` returns undefined
            const shirtsFolder = `${userId}/`;
            const shirtsList = await Storage.list(shirtsFolder);

            const shirtUrls = shirtsList.results
                .map((shirt) => shirt.key)
                .filter((url) => url !== undefined) as string[];

            this.setShirts(shirtUrls);

        } catch (error) {
            console.error('Error fetching user shirts:', error);
        }
    });

    removeShirt = action(async (shirtPath: string) => {

        console.log("Removing:", shirtPath);

        // remove file from bucket
        try {
            await Storage.remove(shirtPath);
            console.log("Successfully removed file: ", shirtPath);
            // remove shirt from shirts state array
            this.setShirts(this.shirts.filter((shirt) => shirt !== shirtPath));
            this.setSelectedShirt("");

        } catch (error) {
            console.log('File deletion failed:', error);
        }

    });

    // functions
    randomizePalette = action(() => {

        // unfill heart if you're on a saved palette and not all areas are locked
        const allAreasLocked = this.hatLock && this.topLock && this.bottomLock && this.shoeLock;
        if (this.heartFilled && !allAreasLocked) this.setHeartFilled(false);

        if (!this.hatLock) {
            const randomHatColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
            this.setHatColor(randomHatColor);
        }

        if (!this.topLock) {
            if (this.selectedShirt) this.setSelectedShirt("");
            const randomTopColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
            this.setTopColor(randomTopColor);
        }

        if (!this.bottomLock) {
            const randomBottomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
            this.setBottomColor(randomBottomColor);
        }

        if (!this.shoeLock) {
            const randomShoeColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
            this.setShoeColor(randomShoeColor);
        }

        // set the selected color to the color of the selected area
        switch (this.selectedArea) {
            case "hat":
                this.setSelectedColor(this.hatColor);
                break;
            case "top":
                this.setSelectedColor(this.topColor);
                break;
            case "bottom":
                this.setSelectedColor(this.bottomColor);
                break;
            case "shoe":
                this.setSelectedColor(this.shoeColor);
                break;
        }
    });

    randomizeOutfit = action(() => {
        // generate a random number between 0 and length of each swatch array
        // set each area color to the swatchArray[index]

        if (!this.hatLock && (this.hatSwatches.length !== 0)) {
            const hatIndex = Math.floor(Math.random() * this.hatSwatches.length);
            this.setHatColor(this.hatSwatches[hatIndex].color);
        }

        if (!this.topLock && (this.topSwatches.length !== 0)) {
            if (this.selectedShirt) this.setSelectedShirt("");
            const topIndex = Math.floor(Math.random() * this.topSwatches.length);
            this.setTopColor(this.topSwatches[topIndex].color);
        }

        if (!this.bottomLock && (this.bottomSwatches.length !== 0)) {
            const bottomIndex = Math.floor(Math.random() * this.bottomSwatches.length);
            this.setBottomColor(this.bottomSwatches[bottomIndex].color);
        }

        if (!this.shoeLock && (this.shoeSwatches.length !== 0)) {
            const shoeIndex = Math.floor(Math.random() * this.shoeSwatches.length);
            this.setShoeColor(this.shoeSwatches[shoeIndex].color);
        }
    });

    handleModeChange = action((newMode: string) => {

        // if you aren't changing mdoes, don't do anything
        if (newMode === this.mode) return;

        this.setMode(newMode);
        this.setNavbarOpen(false);

    });

    handleAreaChange = action((area: string) => {
        this.setSelectedArea(area);

        switch (area) {
            case "hat":
                this.setSelectedColor(this.hatColor);
                break;
            case "face":
                this.setSelectedColor(this.faceColor);
                break;
            case "top":
                this.setSelectedColor(this.topColor);
                break;
            case "bottom":
                this.setSelectedColor(this.bottomColor);
                break;
            case "shoe":
                this.setSelectedColor(this.shoeColor);
                break;
        }
    });

    checkAreaLock = (area: string) => {
        switch (area) {
            case "hat":
                return this.hatLock;
            case "top":
                return this.topLock;
            case "bottom":
                return this.bottomLock;
            case "shoe":
                return this.shoeLock;
            default:
                return false;
        }
    };

    handleColorChangePicker = action((color: string) => {

        // if its heartFilled and the area you're trying to change is not locked
        const isAreaLocked = this.checkAreaLock(this.selectedArea);
        if (this.heartFilled && !isAreaLocked) this.setHeartFilled(false);

        if (!isAreaLocked) {

            switch (this.selectedArea) {
                case "hat":
                    this.setHatColor(color);
                    break;
                case "face":
                    this.setFaceColor(color);
                    break;
                case "top":
                    if (this.selectedShirt) this.setSelectedShirt("");
                    this.setTopColor(color);
                    break;
                case "bottom":
                    this.setBottomColor(color);
                    break;
                case "shoe":
                    this.setShoeColor(color);
                    break;
                default:
                    break;
            };

            this.setSelectedColor(color);

        }
    });

    handleColorChangeSwatch = action((color: string, area: string) => {

        const isAreaLocked = this.checkAreaLock(area);

        if (!isAreaLocked) {

            switch (area) {
                case "hat":
                    this.setHatColor(color);
                    break;
                case "face":
                    this.setFaceColor(color);
                    break;
                case "top":
                    if (this.selectedShirt) this.setSelectedShirt("");
                    this.setTopColor(color);
                    break;
                case "bottom":
                    this.setBottomColor(color);
                    break;
                case "shoe":
                    this.setShoeColor(color);
                    break;
                default:
                    break;
            }

            this.setSelectedArea(area);
            this.setSelectedColor(color);

        }


    });

    getSwatchId = (colorToFind: string, stateArray: SwatchObject[]): string | null => {
        const foundObject = stateArray.find((obj: SwatchObject) => obj.color === colorToFind);
        if (foundObject) {
            return foundObject.id;
        }
        return null; // Return null when there is no match
    };

    handleColorSwatch = action((area: string) => {

        // add color to the corresponding swatches array if it isn't already
        switch (area) {
            case "hat": {

                const id = this.getSwatchId(this.hatColor, this.hatSwatches);

                if (id) this.removeGarment(id, area);
                else this.addGarmentToDB("hat", this.hatColor);

                this.setSelectedColor(this.hatColor);
                break;
            }
            case "top": {
                const id = this.getSwatchId(this.topColor, this.topSwatches);

                if (id) this.removeGarment(id, area);
                else this.addGarmentToDB(area, this.topColor);

                this.setSelectedColor(this.topColor);
                break;
            }
            case "bottom": {
                const id = this.getSwatchId(this.bottomColor, this.bottomSwatches);

                if (id) this.removeGarment(id, area);
                else this.addGarmentToDB(area, this.bottomColor);

                this.setSelectedColor(this.bottomColor);
                break;
            }
            case "shoe": {
                const id = this.getSwatchId(this.shoeColor, this.shoeSwatches);

                if (id) this.removeGarment(id, area);
                else this.addGarmentToDB(area, this.shoeColor);

                this.setSelectedColor(this.shoeColor);
                break;
            }
            default:
                break;
        }

        this.setSelectedArea(area);
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
        const isAreaLocked = this.checkAreaLock(this.selectedArea);
        if (!isAreaLocked) {

            switch (this.selectedArea) {
                case "hat":
                    this.setSelectedColor(hatColor);
                    break;
                case "face":
                    break;
                case "top":
                    if (this.selectedShirt) this.setSelectedShirt("");
                    this.setSelectedColor(topColor);
                    break;
                case "bottom":
                    this.setSelectedColor(bottomColor);
                    break;
                case "shoe":
                    this.setSelectedColor(shoeColor);
                    break;
                default:
                    break;
            }

        }
        const anyAreaLocked = this.hatLock || this.topLock || this.bottomLock || this.shoeLock;

        // a locked area stops us from assigning all area colors - thus palette isn't one that we've saved
        if (anyAreaLocked && (this.selectedPalette !== id)) this.setHeartFilled(false);
        else {
            this.setHeartFilled(true);
            this.setSelectedPalette(id);
        }

    });

    fetchGarmentsFromDB = action(async (): Promise<Garment[]> => {
        try {
            const response = (await API.graphql<GraphQLQuery<ListGarmentsQuery>>(graphqlOperation(listGarments))) as GraphQLResult<ListGarmentsQuery>;
            const { data } = response;
            if (data && data.listGarments && data.listGarments.items) {
                const userGarments = data.listGarments.items as Garment[];
                const grouped = groupByArea(userGarments);
                this.setHatSwatches(grouped["hat"]);
                this.setTopSwatches(grouped["top"]);
                this.setBottomSwatches(grouped["bottom"]);
                this.setShoeSwatches(grouped["shoe"]);
                return userGarments;
            } else {
                throw new Error("Could not get garments");
            }
        } catch (error: any) {
            throw new Error("Could not get palettes");
        }
    });

    addGarmentToDB = action(async (area: string, color: string) => {
        try {

            const createNewGarmentInput: CreateGarmentInput = {
                color: color,
                area: area
            };

            const response = await API.graphql<GraphQLQuery<CreateGarmentMutation>>(graphqlOperation(createGarment, {
                input: createNewGarmentInput
            })) as GraphQLResult<CreateGarmentMutation>;
            const { data } = response;
            if (data && data.createGarment) {
                const createdGarment = data.createGarment;
                // add createdGarment to swatches
                const newSwatch: SwatchObject = { color: createdGarment.color, id: createdGarment.id };

                switch (area) {
                    case "hat":
                        this.setHatSwatches([newSwatch, ...this.hatSwatches]);
                        break;
                    case "top":
                        this.setTopSwatches([newSwatch, ...this.topSwatches]);
                        break;
                    case "bottom":
                        this.setBottomSwatches([newSwatch, ...this.bottomSwatches]);
                        break;
                    case "shoe":
                        this.setShoeSwatches([newSwatch, ...this.shoeSwatches]);
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
                // remove removedGarment from swatches array

                switch (area) {
                    case "hat":
                        this.setHatSwatches(this.hatSwatches.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "top":
                        this.setTopSwatches(this.topSwatches.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "bottom":
                        this.setBottomSwatches(this.bottomSwatches.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "shoe":
                        this.setShoeSwatches(this.shoeSwatches.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                }


                // this.setPalettes(this.palettes.filter((swatch) => swatch.id !== removedGarment.id));
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

    signUserOut = action(async () => {

        // Clear the access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        try {
            await Auth.signOut();
            this.handleModeChange("lab");

            // handle clean-up
            if (this.hatLock) this.setHatLock(false);
            if (this.topLock) this.setTopLock(false);
            if (this.bottomLock) this.setBottomLock(false);
            if (this.shoeLock) this.setShoeLock(false);

            if (this.selectedShirt) {
                const randomTopColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
                this.setSelectedShirt("");
                this.setTopColor(randomTopColor);
            }

            this.setSelectedArea("top");
            this.setSelectedColor(this.topColor);

            this.setShirts([]);
            this.setPalettes([]);

        } catch (error) {
            console.log('Sign-out error:', error);
        }
    });

}

const appStore = new AppStore();
export default appStore;

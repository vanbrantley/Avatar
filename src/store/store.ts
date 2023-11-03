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
    hatColor = "#000000";
    faceColor = "#a18057";
    topColor = "#ffffff";
    bottomColor = "#5687b8";
    shoeColor = "#000000";

    selectedCategory: GarmentType = GarmentType.Top;
    selectedColor = this.topColor;

    selectedGarment: Garment | null = null;

    userHats: Garment[] = [];
    userTops: Garment[] = [];
    userBottoms: Garment[] = [];
    userShoes: Garment[] = [];

    hatLock = false;
    topLock = false;
    bottomLock = false;
    shoeLock = false;

    palettes: Palette[] = [];
    selectedPalette = "";

    navbarOpen = false;

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
            selectedCategory: observable,
            selectedColor: observable,
            selectedGarment: observable,
            userHats: observable,
            userTops: observable,
            userBottoms: observable,
            userShoes: observable,
            hatLock: observable,
            topLock: observable,
            bottomLock: observable,
            shoeLock: observable,
            palettes: observable,
            selectedPalette: observable,
            navbarOpen: observable,
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

    setSelectedCategory = action((category: GarmentType) => {
        this.selectedCategory = category;
    });

    setSelectedColor = action((color: string) => {
        this.selectedColor = color;
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
                this.setSelectedColor(this.hatColor);
                break;
            // case "face":
            //     this.setSelectedColor(this.faceColor);
            //     break;
            case GarmentType.Top:
                this.setSelectedColor(this.topColor);
                break;
            case GarmentType.Bottom:
                this.setSelectedColor(this.bottomColor);
                break;
            case GarmentType.Shoe:
                this.setSelectedColor(this.shoeColor);
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

    handleColorChangeSwatch = action((color: string, area: GarmentType) => {

        // const isAreaLocked = this.checkAreaLock(area);

        // if (!isAreaLocked) {

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
                switch (area) {
                    case GarmentType.Hat:
                        this.setUserHats([createdGarment, ...this.userHats]);
                        break;
                    case GarmentType.Top:
                        this.setUserTops([createdGarment, ...this.userTops]);
                        break;
                    case GarmentType.Bottom:
                        this.setUserBottoms([createdGarment, ...this.userBottoms]);
                        break;
                    case GarmentType.Shoe:
                        this.setUserShoes([createdGarment, ...this.userShoes]);
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

            // console.log(updateGarmentInput);

            const response = await API.graphql<GraphQLQuery<UpdateGarmentMutation>>(graphqlOperation(updateGarment, {
                input: updateGarmentInput
            })) as GraphQLResult<UpdateGarmentMutation>;
            const { data } = response;
            if (data && data.updateGarment) {
                const updatedGarment = data.updateGarment as Garment;
                console.log("Garment updated successfully: ", updatedGarment);

                // update the garment in the userGarments state array
                let updatedArray: Garment[];
                switch (area) {
                    case "hat":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userHats.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserHats(updatedArray);
                        break;
                    case "top":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userTops.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserTops(updatedArray);
                        break;
                    case "bottom":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userBottoms.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserBottoms(updatedArray);
                        break;
                    case "shoe":
                        updatedArray = [
                            updatedGarment,
                            ...(this.userShoes.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                        ];
                        this.setUserShoes(updatedArray);
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
                switch (area) {
                    case "hat":
                        this.setUserHats(this.userHats.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "top":
                        this.setUserTops(this.userTops.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "bottom":
                        this.setUserBottoms(this.userBottoms.filter((swatch) => swatch.id !== removedGarment.id));
                        break;
                    case "shoe":
                        this.setUserShoes(this.userShoes.filter((swatch) => swatch.id !== removedGarment.id));
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

            this.setHatColor("#000000");
            this.setFaceColor("#a18057");
            this.setTopColor("#ffffff");
            this.setBottomColor("#5687b8");
            this.setShoeColor("#000000");

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

import {
    CreateGarmentInput, CreateGarmentMutation, CreateComplexionInput, CreateComplexionMutation, DeleteGarmentInput,
    DeleteGarmentMutation, Garment, ListGarmentsQuery, ListComplexionsQuery, UpdateComplexionInput, Group, GroupAssignments,
    UpdateComplexionMutation, UpdateGarmentInput, UpdateGarmentMutation, CreateOutfitInput, CreateOutfitMutation,
    DeleteOutfitInput, DeleteOutfitMutation, ListOutfitsQuery, DeleteGroupInput, DeleteGroupMutation, CreateGroupInput, CreateGroupMutation, ListGroupsQuery, ListGroupAssignmentsQuery
} from '@/API';
import { observable, action, makeObservable, computed } from 'mobx';
import { API, Auth } from 'aws-amplify';
import { GraphQLQuery, GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listGarments, listComplexions, listOutfits, listGroups, listGroupAssignments } from '../graphql/queries';
import {
    createGarment, createComplexion, deleteGarment, updateComplexion,
    updateGarment, createOutfit, deleteOutfit, deleteGroup, createGroup
} from '../graphql/mutations';
import { CognitoUser } from '@aws-amplify/auth';
import { Layout, Mode, GarmentType, GarmentTypeStrings, Outfit, EmbeddedOutfit } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';
import isEqual from 'lodash/isEqual';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';

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

    garments: Garment[] = [];

    // OG complexion #a18057
    complexions: string[] = ["#ecdacc", "#dbc9ba", "#d9bca7",
        "#d3aa8a", "#cd9d79", "#b58c6d",
        "#5c493a", "#3d2e22",
        "#3b2616", "#23160d", "#120904", "#080400"];

    selectedComplexion = Math.floor(Math.random() * this.complexions.length);
    faceColor = this.complexions[this.selectedComplexion];

    selectedCategory: GarmentType = GarmentType.Top;
    selectedColor = this.selectedTop.color; // color picker's color

    groups: Group[] = [];
    groupAssignments: GroupAssignments[] = [];
    selectedGroup = "all";
    groupGarmentIds: string[] = [];

    outfits: Outfit[] = [];
    embeddedOutfits: EmbeddedOutfit[] = [];
    selectedOutfit: EmbeddedOutfit | null = null;

    navbarOpen = false;
    colorPickerOpen = false;
    showAvatar = true;
    showPicker = true;

    mode: Mode = Mode.Closet;
    layout: Layout = Layout.Desktop;
    user: CognitoUser | null = null;

    errorMessage: string | null = null;
    showErrorMessage = false;
    successMessage: string | null = null;
    showSuccessMessage = false;

    constructor() {

        makeObservable(this, {

            // state variables + their setters
            faceColor: observable,
            selectedHat: observable,
            selectedTop: observable,
            selectedBottom: observable,
            selectedShoe: observable,
            selectedGarment: observable,
            garments: observable,
            userHats: computed,
            userTops: computed,
            userBottoms: computed,
            userShoes: computed,
            complexions: observable,
            selectedComplexion: observable,
            selectedCategory: observable,
            selectedColor: observable,
            groups: observable,
            groupAssignments: observable,
            selectedGroup: observable,
            groupGarmentIds: observable,
            outfits: observable,
            embeddedOutfits: observable,
            selectedOutfit: observable,
            navbarOpen: observable,
            colorPickerOpen: observable,
            showAvatar: observable,
            showPicker: observable,
            mode: observable,
            layout: observable,
            user: observable,
            errorMessage: observable,
            showErrorMessage: observable,
            successMessage: observable,
            showSuccessMessage: observable
        });

    }

    // computed properties

    // change these user... to shownHats, shownTops, shownBottoms, shownShoes
    // if selectedGroup != 'all', additonal filter is added

    // Note: want shown arrays to include everything when Mode is ManageGroup so you can add/remove garments from the group

    get userHats() {
        if (this.selectedGroup == 'all' || this.mode == Mode.ManageGroup) return this.garments.filter(garment => garment.area === 'hat');
        else return this.garments.filter(garment => garment.area === 'hat' && this.groupGarmentIds.includes(garment.id));
    };

    get userTops() {
        if (this.selectedGroup == 'all' || this.mode == Mode.ManageGroup) return this.garments.filter(garment => garment.area === 'top');
        else return this.garments.filter(garment => garment.area === 'top' && this.groupGarmentIds.includes(garment.id));
    };

    get userBottoms() {
        if (this.selectedGroup == 'all' || this.mode == Mode.ManageGroup) return this.garments.filter(garment => garment.area === 'bottom');
        else return this.garments.filter(garment => garment.area === 'bottom' && this.groupGarmentIds.includes(garment.id));
    };

    get userShoes() {
        if (this.selectedGroup == 'all' || this.mode == Mode.ManageGroup) return this.garments.filter(garment => garment.area === 'shoe');
        else return this.garments.filter(garment => garment.area === 'shoe' && this.groupGarmentIds.includes(garment.id));
    };

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

    setGarments = action((garments: Garment[]) => {
        this.garments = garments;
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

    setGroups = action((groups: Group[]) => {
        this.groups = groups;
    });

    setGroupAssignments = action((groupAssignments: GroupAssignments[]) => {
        this.groupAssignments = groupAssignments;
    });

    setSelectedGroup = action((group: string) => {
        this.selectedGroup = group;
    });

    setGroupGarmnetIds = action((groupGarmentIds: string[]) => {
        this.groupGarmentIds = groupGarmentIds;
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

    handleAvatarClick = action((area: GarmentType) => {

        this.handleAreaChange(area);
        this.setMode(Mode.Closet);
        if (this.layout === Layout.Mobile) this.setShowAvatar(false);

    });

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

    handleAddGarmentButtonClick = action((user: CognitoUser | null, brand: string | undefined, name: string) => {

        if (user) this.addGarmentToDB(GarmentTypeStrings[this.selectedCategory], this.selectedColor, brand, name);
        else this.addGarmentLocal(this.selectedCategory, this.selectedColor, brand, name);
        this.handleModeChange(Mode.Closet);
        this.setColorPickerOpen(false);

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
                this.setSelectedCategory(GarmentType.Hat);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                this.setSelectedTop(garment);
                this.setSelectedCategory(GarmentType.Top);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                this.setSelectedBottom(garment);
                this.setSelectedCategory(GarmentType.Bottom);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                this.setSelectedShoe(garment);
                this.setSelectedCategory(GarmentType.Shoe);
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
                this.setGarments(userGarments);

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
        };

        // add createdGarment to garments
        this.setGarments([newGarment, ...this.garments]);

        // make newGarmnet the selected area garment
        switch (area) {
            case GarmentType.Hat:
                this.setSelectedHat(newGarment);
                break;
            case GarmentType.Top:
                this.setSelectedTop(newGarment);
                break;
            case GarmentType.Bottom:
                this.setSelectedBottom(newGarment);
                break;
            case GarmentType.Shoe:
                this.setSelectedShoe(newGarment);
                break;
        }

    });

    addGarmentToDB = action(async (area: string, color: string, brand: string | undefined, name: string): Promise<Garment | undefined> => {
        try {

            const normalizedBrand = (brand === undefined || brand === '') ? null : brand;

            const createNewGarmentInput: CreateGarmentInput = {
                color: color,
                area: area,
                brand: normalizedBrand,
                name: name
            };

            const response = await API.graphql<GraphQLQuery<CreateGarmentMutation>>(graphqlOperation(createGarment, {
                input: createNewGarmentInput
            })) as GraphQLResult<CreateGarmentMutation>;
            const { data } = response;
            if (data && data.createGarment) {
                const createdGarment = data.createGarment;

                // add createdGarment to garments
                this.setGarments([createdGarment, ...this.garments]);

                // make createdGarmnet the selected area garment
                switch (area) {
                    case GarmentTypeStrings[GarmentType.Hat]:
                        this.setSelectedHat(createdGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Top]:
                        this.setSelectedTop(createdGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Bottom]:
                        this.setSelectedBottom(createdGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Shoe]:
                        this.setSelectedShoe(createdGarment);
                        break;
                }

                this.checkIfSavedOutfit();
                this.setSuccessMessageHandler("Garment added successfully");

                return createdGarment;

            }

            return undefined;

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error adding garment");
            throw error;
        }
    });

    updateGarmentLocal = action((id: string, area: string, color: string, brand: string | undefined, name: string) => {

        const normalizedBrand = (brand === undefined || brand === '') ? null : brand;

        const updatedGarment: Garment = {
            __typename: "Garment",
            id: id,
            area: area,
            color: color,
            brand: normalizedBrand,
            name: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: null
        };

        // update the garment in the garments state array
        const updatedArray: Garment[] = [
            updatedGarment,
            ...(this.garments.filter(garment => garment.id !== updatedGarment.id) as Garment[])
        ];
        this.setGarments(updatedArray);

        // update the selected area garment
        switch (area) {
            case GarmentTypeStrings[GarmentType.Hat]:
                this.setSelectedHat(updatedGarment);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                this.setSelectedTop(updatedGarment);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                this.setSelectedBottom(updatedGarment);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                this.setSelectedShoe(updatedGarment);
                break;
        }

        this.setSuccessMessageHandler("Garment updated successfully");

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

                // update the garment in the garments state array
                const updatedArray: Garment[] = [
                    updatedGarment,
                    ...(this.garments.filter(garment => garment.id !== updatedGarment.id) as Garment[])
                ];
                this.setGarments(updatedArray);

                // update the selected area garment
                switch (area) {
                    case GarmentTypeStrings[GarmentType.Hat]:
                        this.setSelectedHat(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Top]:
                        this.setSelectedTop(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Bottom]:
                        this.setSelectedBottom(updatedGarment);
                        break;
                    case GarmentTypeStrings[GarmentType.Shoe]:
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

    removeGarmentLocal = action((garmentId: string, area: string) => {

        // remove removedGarment from garments array
        this.setGarments(this.garments.filter((garment) => garment.id !== garmentId));

        // reset selected area garment
        switch (area) {
            case GarmentTypeStrings[GarmentType.Hat]:
                if (this.userHats.length === 0) {
                    this.setSelectedHat(this.defaultHat);
                } else {
                    const randomHat = this.getRandomGarment(this.userHats);
                    this.setSelectedHat(randomHat);
                }
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                if (this.userTops.length === 0) {
                    this.setSelectedTop(this.defaultTop);
                } else {
                    const randomTop = this.getRandomGarment(this.userTops);
                    this.setSelectedTop(randomTop);
                }
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                if (this.userBottoms.length === 0) {
                    this.setSelectedBottom(this.defaultBottom);
                } else {
                    const randomBottom = this.getRandomGarment(this.userBottoms);
                    this.setSelectedBottom(randomBottom);
                }
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                if (this.userShoes.length === 0) {
                    this.setSelectedShoe(this.defaultShoe);
                } else {
                    const randomShoe = this.getRandomGarment(this.userShoes);
                    this.setSelectedShoe(randomShoe);
                }
                break;
        }

        this.setSuccessMessageHandler("Garment removed successfully");

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
                this.setGarments(this.garments.filter((garment) => garment.id !== removedGarment.id));

                // reset selected area garment
                switch (area) {
                    case GarmentTypeStrings[GarmentType.Hat]:
                        if (this.userHats.length === 0) {
                            this.setSelectedHat(this.defaultHat);
                        } else {
                            const randomHat = this.getRandomGarment(this.userHats);
                            this.setSelectedHat(randomHat);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Top]:
                        if (this.userTops.length === 0) {
                            this.setSelectedTop(this.defaultTop);
                        } else {
                            const randomTop = this.getRandomGarment(this.userTops);
                            this.setSelectedTop(randomTop);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Bottom]:
                        if (this.userBottoms.length === 0) {
                            this.setSelectedBottom(this.defaultBottom);
                        } else {
                            const randomBottom = this.getRandomGarment(this.userBottoms);
                            this.setSelectedBottom(randomBottom);
                        }
                        break;
                    case GarmentTypeStrings[GarmentType.Shoe]:
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

                this.checkIfSavedOutfit();

            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error removing garment");
            throw error;
        }
    });

    handleUpdateGarmentButtonClick = action((user: CognitoUser | null, brand: string | undefined, name: string) => {

        const { id, area } = this.selectedGarment;
        if (user) this.updateGarmentToDB(id, area, this.selectedColor, brand, name);
        else this.updateGarmentLocal(id, area, this.selectedColor, brand, name);
        this.handleModeChange(Mode.Closet);
        this.setColorPickerOpen(false);

    });

    handleConfirmDeleteGarment = action((user: CognitoUser | null) => {

        const { id, area } = this.selectedGarment;
        if (user) this.removeGarment(id, area);
        else this.removeGarmentLocal(id, area);
        this.setColorPickerOpen(false);
        this.handleModeChange(Mode.Closet);

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
                this.checkIfSavedOutfit();
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

    addDefaultGarmentToDB = action(async (defaultGarment: Garment): Promise<Garment | null> => {

        const { area, color } = defaultGarment;
        const name = `${color} ${area}`;

        try {
            const createdGarment = await this.addGarmentToDB(area, color, undefined, name);
            return createdGarment || null;
        } catch (error) {
            console.error('Error adding default garment:', error);
            return null;
        }

    });

    saveOutfit = action(async () => {

        try {

            const isHatDefault = isEqual(this.selectedHat, this.defaultHat);
            const isTopDefault = isEqual(this.selectedTop, this.defaultTop);
            const isBottomDefault = isEqual(this.selectedBottom, this.defaultBottom);
            const isShoeDefault = isEqual(this.selectedShoe, this.defaultShoe);

            const hat = isHatDefault ? await this.addDefaultGarmentToDB(this.defaultHat) : this.selectedHat;
            const top = isTopDefault ? await this.addDefaultGarmentToDB(this.defaultTop) : this.selectedTop;
            const bottom = isBottomDefault ? await this.addDefaultGarmentToDB(this.defaultBottom) : this.selectedBottom;
            const shoe = isShoeDefault ? await this.addDefaultGarmentToDB(this.defaultShoe) : this.selectedShoe;

            if (!(hat && top && bottom && shoe)) {
                console.warn('One or more default garments failed to be added to the database.');
                return;
            }

            // create CreateOutfitInput object with ids of selected garments
            const createNewOutfitInput: CreateOutfitInput = {
                hatId: hat.id,
                topId: top.id,
                bottomId: bottom.id,
                shoeId: shoe.id
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

    initializeRandomComplexion = action(() => {
        this.setSelectedComplexion(Math.floor(Math.random() * this.complexions.length));
        this.setFaceColor(this.complexions[this.selectedComplexion]);
    });

    fetchComplexion = action(async () => {

        try {
            const response = await API.graphql<GraphQLQuery<ListComplexionsQuery>>(graphqlOperation(listComplexions)) as GraphQLResult<ListComplexionsQuery>;
            const { data } = response;

            if (data && data.listComplexions && data.listComplexions.items) {
                const complexion = data.listComplexions.items[0]?.complexion;
                if (complexion) {
                    if (complexion !== this.faceColor) this.setFaceColor(complexion);
                    const complexionIndex = this.complexions.indexOf(complexion)
                    this.setSelectedComplexion(complexionIndex);
                }
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

    handleComplexionClick = action((user: CognitoUser | null, index: number) => {
        this.setSelectedComplexion(index);
        if (user) this.updateComplexion(this.complexions[index]);
        else this.setFaceColor(this.complexions[index]);
    });

    captureImage(component: ReactElement) {

        const element = document.createElement('div');
        document.body.appendChild(element);

        const containerRef = document.createElement('div');
        containerRef.style.width = '800px';
        element.appendChild(containerRef);

        // Save the current viewport setting
        const viewportMeta = document.getElementById('viewportMeta');
        const originalViewportContent = viewportMeta?.getAttribute('content') || '';

        // Set the viewport to a specific width before calling html2canvas
        viewportMeta?.setAttribute('content', 'width=800');

        // Render the component into the temporary div
        ReactDOM.render(component, containerRef);

        html2canvas(containerRef).then((canvas) => {
            const dataURL = canvas.toDataURL();

            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'avatar.png';
            a.click();

            // Cleanup: Remove the temporary div and clear its content
            document.body.removeChild(element);
            ReactDOM.unmountComponentAtNode(element);

            // Restore the original viewport setting
            viewportMeta?.setAttribute('content', originalViewportContent);

        });
    };

    // create group
    createGroup = action(async (name: string) => {

        try {

            const createNewGroupInput: CreateGroupInput = {
                name: name
            };

            const response = await API.graphql<GraphQLQuery<CreateGroupMutation>>(graphqlOperation(createGroup, {
                input: createNewGroupInput
            })) as GraphQLResult<CreateGroupMutation>;
            const { data } = response;

            if (data && data.createGroup) {
                const createdGroup = data.createGroup;
                const { id, name } = createdGroup;
                this.setSelectedGroup(id);
                // add newly created group to groups
                this.setGroups([createdGroup, ...this.groups]);
                this.setSuccessMessageHandler("Group created successfully");
            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error saving outfit");
            throw error;
        }

    });



    // read group(s) - groupAssignment stuff is also done here you think
    fetchGroups = action(async (): Promise<Group[]> => {

        try {
            const response = (await API.graphql<GraphQLQuery<ListGroupsQuery>>(graphqlOperation(listGroups))) as GraphQLResult<ListGroupsQuery>;
            const { data } = response;
            if (data && data.listGroups && data.listGroups.items) {

                const userGroups = data.listGroups.items as Group[];
                this.setGroups(userGroups);
                return userGroups;

            } else {
                throw new Error("Error fetching user groups");
            }
        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error fetching user groups");
            throw error;
        }

    });

    fetchGroupAssignments = action(async (): Promise<GroupAssignment[]> => {

        try {
            const response = (await API.graphql<GraphQLQuery<ListGroupAssignmentsQuery>>(graphqlOperation(listGroupAssignments))) as GraphQLResult<ListGroupAssignmentsQuery>;
            const { data } = response;
            if (data && data.listGroupAssignments && data.listGroupAssignments.items) {

                const userGroupAssignments = data.listGroupAssignments.items as GroupAssignment[];
                this.setGroupAssignments(userGroupAssignments);
                return userGroupAssignments;

            } else {
                throw new Error("Error fetching user group assignments");
            }
        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error fetching user group assignments");
            throw error;
        }

    });

    // update group / edit group - this is where the groupAssignments logic is handled 
    // think you do have to store the groupAssingments in store..
    // take in list of addedGarmentIds , calculate diffs (ins and outs) , process diffs (creating and deleting GroupAssignments)
    // update groupAssignments state array (is this array even necessary? don't think so) & groupGarmentIds 
    editGroupGarments = action(async (clickedGarmentIds: string[]) => {

        // calculate diffs between clickedGarmentIds & this.groupGarmentIds
        const addedGarmentIds = clickedGarmentIds.filter((garmentId) => !this.groupGarmentIds.includes(garmentId)); // ones in clickedGarmentIds but not groupGarmnetIds
        const removedGarmentIds = this.groupGarmentIds.filter((garmentId) => !clickedGarmentIds.includes(garmentId)); // ones in this.groupGarmentIds that are not in clickedGarmentIds

        // process diffs
        // remove garments (groupAssignments) that were unclicked
        for (const removedGarmentId of removedGarmentIds) {
            // await this.deleteGroupAssignment(removedGarmentId);
        }

        // create groupAssignments that were clicked
        for (const addedGarmentId of addedGarmentIds) {

            // await this.createGroupAssignment(addedGarmentId);
        }

        // update groupAssignments & groupGarmentIds

    });



    // delete group
    // first delete the group
    // then delete all entries from the group assignments array where groupId = deletedGroup.id

    deleteGroup = action(async (groupId: string) => {

        // could also not have the groupId argument and just have a wrapping check to make sure this.selectedGroup != "all"

        try {
            const groupDetails: DeleteGroupInput = {
                id: groupId,
            };

            const response = await API.graphql<GraphQLQuery<DeleteGroupMutation>>(graphqlOperation(deleteGroup, {
                input: groupDetails
            })) as GraphQLResult<DeleteGroupMutation>;
            const { data } = response;

            if (data && data.deleteGroup) {
                const removedGroup = data.deleteGroup;

                // set selectedGroup to all
                this.setSelectedGroup("all"); // should make it so that all user garments are shown in closet

                this.setSuccessMessageHandler("Group successfully deleted");

                const groupAssignmentsToDelete: GroupAssignments[] = [];

                for (const groupAssignmentToDelete of groupAssignmentsToDelete) {
                    // await this.deleteGroupAssignment(groupAssignmentToDelete);
                }

            }

        } catch (error: any) {
            console.error(error);
            this.setErrorMessageHandler("Error deleting group");
            throw error;
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

            this.setSelectedCategory(GarmentType.Top);
            this.setSelectedGarment(this.defaultTop);

            this.setSelectedHat(this.defaultHat);
            this.setSelectedTop(this.defaultTop);
            this.setSelectedBottom(this.defaultBottom);
            this.setSelectedShoe(this.defaultShoe);
            this.setSelectedOutfit(null);
            this.setSelectedColor(this.selectedTop.color);

            this.setGarments([]);

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
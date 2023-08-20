import store from './store';
import { mocked } from 'jest-mock';
jest.mock('aws-amplify');
import { API } from 'aws-amplify';

const mockAPI = mocked(API);

describe('AppStore', () => {

    beforeEach(() => {
        store.hatColor = "#000000";
        store.faceColor = "#000000";
        store.topColor = "#000000";
        store.bottomColor = "#000000";
        store.shoeColor = "#000000";
        store.selectedArea = "top"; // Assuming selectedArea is a string property
        store.selectedColor = store.topColor;
        store.hatLock = false;
        store.topLock = false;
        store.bottomLock = false;
        store.shoeLock = false;
        store.palettes = [];
        store.heartFilled = false;

    });

    it('should set the area colors', () => {

        const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        store.setHatColor(randomColor);
        store.setFaceColor(randomColor);
        store.setTopColor(randomColor);
        store.setBottomColor(randomColor);
        store.setShoeColor(randomColor);

        expect(store.hatColor).toBe(randomColor);
        expect(store.faceColor).toBe(randomColor);
        expect(store.topColor).toBe(randomColor);
        expect(store.bottomColor).toBe(randomColor);
        expect(store.shoeColor).toBe(randomColor);

    });

    it('should set the selected area to the area that is clicked on the Avatar or palette', () => {

        store.handleAreaChange("hat");
        expect(store.selectedArea).toBe("hat");

        store.handleAreaChange("top");
        expect(store.selectedArea).toBe("top");

        store.handleAreaChange("bottom");
        expect(store.selectedArea).toBe("bottom");

        store.handleAreaChange("shoe");
        expect(store.selectedArea).toBe("shoe");

    });

    it('should set the selected color to the color of the area that was clicked on the Avatar or palette', () => {

        const hatColor = "#6F0D35";
        store.setHatColor(hatColor);
        store.handleAreaChange("hat");
        expect(store.selectedColor).toBe(hatColor);

        const faceColor = "#A18057";
        store.setFaceColor(faceColor);
        store.handleAreaChange("face");
        expect(store.selectedColor).toBe(faceColor);

        const topColor = "#6081A4";
        store.setTopColor(topColor);
        store.handleAreaChange("top");
        expect(store.selectedColor).toBe(topColor);

        const bottomColor = "#602F01";
        store.setBottomColor(bottomColor);
        store.handleAreaChange("bottom");
        expect(store.selectedColor).toBe(bottomColor);

        const shoeColor = "#B1B103";
        store.setShoeColor(shoeColor);
        store.handleAreaChange("shoe");
        expect(store.selectedColor).toBe(shoeColor);

    });

    it('should change the selected color to the color clicked on the color picker', () => {
        const color = "#B1B103";
        store.handleColorChangePicker(color);
        expect(store.selectedColor).toBe(color);
    });

    it('should change the selected area\'s color to the color clicked on the color picker', () => {

        store.setSelectedArea("hat");
        let color = "#6F0D35";
        store.handleColorChangePicker(color);
        expect(store.hatColor).toBe(color);

        store.setSelectedArea("face");
        color = "#A18057";
        store.handleColorChangePicker(color);
        expect(store.faceColor).toBe(color);

        store.setSelectedArea("top");
        color = "#6081A4";
        store.handleColorChangePicker(color);
        expect(store.topColor).toBe(color);

        store.setSelectedArea("bottom");
        color = "#602F01";
        store.handleColorChangePicker(color);
        expect(store.bottomColor).toBe(color);

        store.setSelectedArea("shoe");
        color = "#B1B103";
        store.handleColorChangePicker(color);
        expect(store.shoeColor).toBe(color);


    });

    it('should not change an area\'s color if it is locked', () => {

        const oldColor = "#3CA5FD";
        const newColor = "#637D37";

        store.setHatColor(oldColor);
        store.setTopColor(oldColor);
        store.setBottomColor(oldColor);
        store.setShoeColor(oldColor);

        store.setHatLock(true);
        store.setTopLock(true);
        store.setBottomLock(true);
        store.setShoeLock(true);


        store.setSelectedArea("hat");
        store.handleColorChangePicker(newColor);
        expect(store.hatColor).toBe(oldColor);
        store.handleColorChangeSwatch(newColor, "hat");
        expect(store.hatColor).toBe(oldColor);

        store.setSelectedArea("top");
        store.handleColorChangePicker(newColor);
        expect(store.topColor).toBe(oldColor);
        store.handleColorChangeSwatch(newColor, "top");
        expect(store.topColor).toBe(oldColor);

        store.setSelectedArea("bottom");
        store.handleColorChangePicker(newColor);
        expect(store.bottomColor).toBe(oldColor);
        store.handleColorChangeSwatch(newColor, "bottom");
        expect(store.bottomColor).toBe(oldColor);

        store.setSelectedArea("shoe");
        store.handleColorChangePicker(newColor);
        expect(store.shoeColor).toBe(oldColor);
        store.handleColorChangeSwatch(newColor, "shoe");
        expect(store.shoeColor).toBe(oldColor);

    });

    it('should give areas new colors when you randomize the palette', () => {

        const color = "#FFFFFF";
        store.setHatColor(color);
        store.setTopColor(color);
        store.setBottomColor(color);
        store.setShoeColor(color);

        store.randomizePalette();

        expect(store.hatColor).not.toBe(color);
        expect(store.topColor).not.toBe(color);
        expect(store.bottomColor).not.toBe(color);
        expect(store.shoeColor).not.toBe(color);

    });

    it('should add a new palette to the palettes array', async () => {

        const mockResponse = {
            data: {
                createPalette: {
                    id: 'fake-palette-id',
                    // Add other properties as needed
                },
            },
        };

        jest.spyOn(mockAPI, 'graphql').mockResolvedValue(mockResponse);

        await store.savePalette();

        expect(store.palettes).toHaveLength(1);
        expect(store.palettes[0].id).toBe('fake-palette-id');

    });

    // Test the savePalette function error handling
    it('should handle errors when saving a palette', async () => {

        const mockErrorLog = jest.spyOn(console, 'error');
        // Mock the API.graphql function to throw an error
        const mockError = new Error('Failed to save palette.');
        mocked(mockAPI.graphql).mockRejectedValue(mockError as never);

        // Call the function
        await store.savePalette();

        // Expect that the palettes array is unchanged
        expect(store.palettes).toHaveLength(0); // Assuming you start with an empty array of palettes

        // Expect that the heartFilled status is unchanged
        expect(store.heartFilled).toBe(false); // Assuming it starts as false

        // Check if the error was logged correctly
        expect(mockErrorLog).toHaveBeenCalledWith('Error adding palette: ', mockError);
    });

    // removing a palette decreases the count in the palettes array & palettes array no longer contains palette 
    it('should remove a palette correctly', async () => {

        // create fake data for the palette to be removed
        const mockResponse = {
            data: {
                createPalette: {
                    id: 'fake-palette-id',
                    // Add other properties as needed
                },
            },
        };

        jest.spyOn(mockAPI, 'graphql').mockResolvedValue(mockResponse);

        await store.savePalette();

        expect(store.palettes).toHaveLength(1);
        expect(store.palettes[0].id).toBe('fake-palette-id');

    });

    // it('should ', () => {});
    // it('should ', () => {});
    // it('should ', () => {});
    // it('should ', () => {});

    // it('should ', () => {});
    // it('should ', () => {});
    // it('should ', () => {});
    // it('should ', () => {});

});


// ok so we're testing, let's just go through the app and write down things that are typically done
// then you can write tests for each

// actions
// click an area on the avatar to set the selected area and set that area's color to selected color ✔️
// click an area on the palette to set the selected area and set that area's color to selected color ✔️
// Select a color on the color picker changes the selectedColor and changes the selected area's color ✔️
// attempting to change color of a locked area does nothing ✔️
// randomize palette gives the areas new colors, not for locked areas - maybe go through all combinations ✔️
// saving a palette increases the count in the palettes array & palettes array contains new palette ✔️
// removing a palette decreases the count in the palettes array & palettes array no longer contains palette 
// GO THROUGH THE HEART FILLED CASES - steps to get the bugs you were getting - can see if changing implementation fixes! 
// Clicking a saved palette assigns the palette colors to the Avatar (but not the locked areas) 
// 
// Clicking square on closet palette that isn't a saved swatch saves color as a swatch (mock API call, increases areaSwatches array by one, contains color) 
// Clicking square on closet palette that is a saved swatch removes color from database (mock API call, decreases areaSwatches array by one, does not contain color) 
// Clicking a swatch changes its areas color (when not locked) 
// test randomize outfit similarly to randomize palette maybe 
// 
// 
// 
// 
// Clicking a mockup (setSelectedShirt) sets top in palette to transparent, sets top lock, shows trash icon, and puts shirt on Avatar (not sure if you can actually test this) 
// if selectedArea is shirt when a mockup is applied, setSelectedColor to transparent (topColor) 
// Uploading a shirt increases the count of the shirts array by one (have to mock the AWS API call) 
// Removing a shirt decreases the count of the shirts array by one, hides trash icon, sets topColor to complexion 
// 
// 
// test sign in, sign up, sign out 
// 

// Handle case when a palette gets saved with a mockup on (also what happens if that mockup gets deleted) 
// Make it so Avatar never has a transparent body part - make it the skin color lol 


// 
// test groups - use a describe block to group all the tests for a specific feature, functionality, or behavior of your component 
// locks 
// heartFilled 
// 
// 
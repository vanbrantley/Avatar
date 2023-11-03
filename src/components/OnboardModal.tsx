import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';

import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import dynamic from 'next/dynamic';
const ChromePicker = dynamic(
    () => import('react-color').then((mod) => mod.ChromePicker),
    { ssr: false }
);

const OnboardModal = observer(() => {

    const store = useContext(AppStoreContext);
    const { showOnboard, setShowOnboard, selectedColor, handleColorChangePicker, setFaceColor } = store;

    const [step, setStep] = useState<number>(0);

    const complexions = ["#DCD6CD", "#C9B898", "#B59F78", "#937651", "#7A5D39", "#503D26", "#443420", "#3A2A16", "#251903"];
    const [selectedComplexion, setSelectedComplexion] = useState<number>(-1);

    const [initialHats, setInitialHats] = useState<string[]>([]);
    const [initialTops, setInitialTops] = useState<string[]>([]);
    const [initialBottoms, setInitialBottoms] = useState<string[]>([]);
    const [initialShoes, setInitialShoes] = useState<string[]>([]);

    const removeItemAt = (array: string[], indexToRemove: number) => {
        const newArray = [...array];
        newArray.splice(indexToRemove, 1);
        return newArray;
    };

    const removeInitialBottom = (index: number) => {
        setInitialBottoms(removeItemAt(initialBottoms, index));
    };

    const removeInitialShoe = (index: number) => {
        setInitialShoes(removeItemAt(initialShoes, index));
    };

    const removeInitialTop = (index: number) => {
        setInitialTops(removeItemAt(initialTops, index));
    };

    const removeInitialHat = (index: number) => {
        setInitialHats(removeItemAt(initialHats, index));
    };

    const createAvatar = () => {

        // for now just set the store state variables
        // after try to get it so when you create an account, it transfers all of the info to the DB

        // make it so it can't be negative 1 - can't advance from first page if you don't pick 
        // or there is a default complexion selected
        const complexion = complexions[selectedComplexion];
        // set complexion state variable without adding anything to db
        setFaceColor(complexion);

        // set swatches state arrays to values added in onboarding
        const initialHatSwatches = initialHats.map((hat) => ({
            color: hat,
            id: '',
        }));
        // setHatSwatches(initialHatSwatches);

        const initialTopSwatches = initialTops.map((top) => ({
            color: top,
            id: '',
        }));
        // setTopSwatches(initialTopSwatches);

        const initialBottomSwatches = initialBottoms.map((bottom) => ({
            color: bottom,
            id: '',
        }));
        // setBottomSwatches(initialBottomSwatches);

        const initialShoeSwatches = initialShoes.map((shoe) => ({
            color: shoe,
            id: '',
        }));
        // setShoeSwatches(initialShoeSwatches);

        // close modal
        handleClose();

    };

    const pages = [
        {
            text: (
                <>
                    This wizard will help onboard you to the application.
                    <br />
                    <br />
                    First let&apos;s create your Avatar!
                    <br />
                    <br />
                    Select the complexion that best matches yours from the options below:
                    (Your complexion can be further fine tuned later within the app)
                    <br />
                    <br />
                </>
            ),
            image: (
                <>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-4">
                            {complexions.map((complexion, i) => {
                                const selected = selectedComplexion === i;
                                return (
                                    <div key={i} onClick={() => setSelectedComplexion(i)} style={{ backgroundColor: complexion, border: selected ? '4px solid white' : 'none' }} className="bg-white p-4 shadow-md rounded-full w-24 h-24 cursor-pointer"></div>
                                );
                            })}
                        </div>
                    </div>
                </>
            ),
        },
        {
            image: (
                // see about turning this into a component which takes an initialArea array & set/remove functions
                <>
                    <div>
                        <ChromePicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={color => handleColorChangePicker(color.hex)}
                        />
                    </div>

                    <div>
                        <IconButton size="large" onClick={() => setInitialBottoms([...initialBottoms, selectedColor])}>
                            <AddIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>

                    <div className="grid grid-cols-5 gap-y-2">
                        {initialBottoms.map((bottom, i) => {
                            return (
                                <div key={i} onClick={() => removeInitialBottom(i)} style={{ backgroundColor: bottom }} className="bg-white p-4 shadow-md rounded-full w-12 h-12"></div>
                            );
                        })}
                    </div>

                </>
            ),
            text: (
                <>
                    <br />
                    Let&apos;s add the colors of pants that you own.
                    <br />
                    <br />
                    Press the plus button to add a color.
                    <br />
                    <br />
                    Click on a color circle to remove a color you&apos;ve added.
                    <br />
                    <br />
                </>
            ),
        },
        {
            image: (
                <>
                    <div>
                        <ChromePicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={color => handleColorChangePicker(color.hex)}
                        />
                    </div>

                    <div>
                        <IconButton size="large" onClick={() => setInitialShoes([...initialShoes, selectedColor])}>
                            <AddIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>

                    <div className="grid grid-cols-5 gap-y-2">
                        {initialShoes.map((shoe, i) => {
                            return (
                                <div key={i} onClick={() => removeInitialShoe(i)} style={{ backgroundColor: shoe }} className="bg-white p-4 shadow-md rounded-full w-12 h-12"></div>
                            );
                        })}
                    </div>
                </>
            ),
            text: (
                <>
                    <br />
                    Let&apos;s add the colors of shoes that you own.
                    <br />
                    <br />
                </>
            ),
        },
        {
            image: (
                <>
                    <div>
                        <ChromePicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={color => handleColorChangePicker(color.hex)}
                        />
                    </div>

                    <div>
                        <IconButton size="large" onClick={() => setInitialTops([...initialTops, selectedColor])}>
                            <AddIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>

                    <div className="grid grid-cols-5 gap-y-2">
                        {initialTops.map((top, i) => {
                            return (
                                <div key={i} onClick={() => removeInitialTop(i)} style={{ backgroundColor: top }} className="bg-white p-4 shadow-md rounded-full w-12 h-12"></div>
                            );
                        })}
                    </div>
                </>
            ),
            text: (
                <>
                    <br />
                    Let&apos;s add the colors of shirts that you own.
                    <br />
                    <br />

                </>
            ),
        },
        {
            image: (
                <>
                    <div>
                        <ChromePicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={color => handleColorChangePicker(color.hex)}
                        />
                    </div>

                    <div>
                        <IconButton size="large" onClick={() => setInitialHats([...initialHats, selectedColor])}>
                            <AddIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>

                    <div className="grid grid-cols-5 gap-y-2">
                        {initialHats.map((hat, i) => {
                            return (
                                <div key={i} onClick={() => removeInitialHat(i)} style={{ backgroundColor: hat }} className="bg-white p-4 shadow-md rounded-full w-12 h-12"></div>
                            );
                        })}
                    </div>
                </>
            ),
            text: (
                <>
                    <br />
                    Let&apos;s add the colors of hats that you own.
                    <br />
                    <br />

                </>
            ),
        },
        {
            image: (
                <>
                    <button onClick={createAvatar}>Finish</button>
                </>
            ),
            text: (
                <>
                    <br />
                    Click the create button to create your Avatar!
                    <br />
                    <br />

                </>
            ),
        },
    ];

    const handleClose = () => {
        setShowOnboard(false);
        setStep(0);
    };

    const handleNextPage = () => {
        if (step < pages.length - 1) {
            setStep(step + 1);
        }
    };

    const handlePrevPage = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="flex items-center justify-center mt-20">

            <Modal open={showOnboard} onClose={handleClose}>
                <Dialog open={showOnboard} onClose={handleClose}>
                    <p style={{ fontFamily: "Verdana" }}>{pages[step].text}</p>
                    <div>{pages[step].image}</div>
                    <div>
                        <Button onClick={handlePrevPage} disabled={step === 0}>
                            Previous
                        </Button>
                        <Button onClick={handleNextPage} disabled={step === pages.length - 1}>
                            Next
                        </Button>
                    </div>
                </Dialog>
            </Modal>

        </div>
    );

});

export default OnboardModal;
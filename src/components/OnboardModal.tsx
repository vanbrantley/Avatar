import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';

import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Avatar from './Avatar';
import Palette from './Palette';

import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const OnboardModal = observer(() => {

    const store = useContext(AppStoreContext);
    const { showOnboard, setShowOnboard, selectedColor, handleColorChangePicker, layout } = store;

    const [step, setStep] = useState<number>(0);

    const complexions = ["#DCD6CD", "#C9B898", "#B59F78", "#937651", "#7A5D39", "#503D26", "#443420", "#3A2A16", "#251903"];

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
                            {complexions.map((complexion, i) => (
                                <div key={i} style={{ backgroundColor: complexion }} className="bg-white p-4 shadow-md rounded-full w-24 h-24"></div>
                            ))}
                        </div>
                    </div>
                </>
            ),
        },
        {
            image: (
                <>
                    <p>Placeholder image</p>
                </>
            ),
            text: (
                <>
                    <br />
                    Let&apos;s add the colors of pants that you own.
                    <br />
                    <br />
                </>
            ),
        },
        {
            image: (
                <>
                    <p>Placeholder image</p>
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
                    <p>Placeholder image</p>
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
                    <p>Placeholder image</p>
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
            {/* <p>Help Modal</p> */}

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
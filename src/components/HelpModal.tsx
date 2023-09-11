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

const HelpModal = observer(() => {

    const store = useContext(AppStoreContext);
    const { showHelp, setShowHelp, selectedColor, handleColorChangePicker } = store;

    const [step, setStep] = useState<number>(0);

    const pages = [
        {
            image: (
                <>
                    <Avatar mini={true} />
                </>
            ),
            text: (
                <>
                    <br />
                    Welcome to Avatar!
                    <br />
                    <br />
                    Here you can use the pixel Avatar chacter to model different outfit color combinations.
                    <br />
                    <br />
                </>
            ),
        },
        {
            image: (
                <div className="flex">
                    <div className="flex-none">
                        <Palette lock={false} />
                    </div>
                    <div className="flex-grow">
                        <Avatar mini={true} />
                    </div>
                </div>
            ),
            text: (
                <>
                    <br />
                    The character is made up of 5 areas that you can change the color of:
                    <br />
                    hat, face, top, bottom, and shoe.
                    <br />
                    <br />
                    Click an area on the Avatar to make it the selected area.
                    <br />
                    <br />
                    The selected area is denoted by the outlined square in the palette.
                    <br />
                    <br />
                </>
            ),
        },
        {
            image: (
                <div className="flex">
                    <div className="flex-none w-1/5">
                        <Palette lock={false} />
                    </div>
                    <div className="flex-grow w-2/5">
                        <Avatar mini={true} />
                    </div>
                    <div className="flex-grow w-2/5">
                        <SketchPicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={color => handleColorChangePicker(color.hex)}
                        />
                    </div>
                </div>
            ),
            text: (
                <>
                    <br />
                    Use the color picker and color swatches to change the color of the selected area.
                    <br />
                    <br />
                </>
            ),
        },
        {
            // image: 'avatar-a4.png',
            image: (
                <>

                </>
            ),
            text: (
                <>
                    <br />
                    Use the randomize button to generate some inspiration.
                    <br />
                    <br />

                </>
            ),
        },
    ];

    const handleClose = () => {
        setShowHelp(false);
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

            <Modal open={showHelp} onClose={handleClose}>

                <Dialog open={showHelp} onClose={handleClose}>
                    {/* <img src={pages[step].image} alt={`Page ${step + 1}`} /> */}
                    <div>{pages[step].image}</div>
                    <p style={{ fontFamily: "Verdana" }}>{pages[step].text}</p>
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

export default HelpModal;
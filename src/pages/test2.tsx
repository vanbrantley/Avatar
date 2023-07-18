import Header from "@/components/Header/Header";

const Test2 = () => {

    const m_paths = [
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
        "globo_1.png", "globo_2.png", "globo_1.png", "globo_2.png",
    ];

    return (
        <div className="h-screen bg-yellow-600 flex flex-col">
            <Header />
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-3 gap-4 p-4">
                    {m_paths.map((path, index) => (
                        <div key={index} className="flex justify-center">
                            <div className="max-h-full">
                                <img src={`/${path}`} alt="Image" className="object-contain h-full w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Test2;
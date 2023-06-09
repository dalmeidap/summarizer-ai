import { logo } from '../assets';

const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className="flex justify-between items-center w-full mb-10 pt-3">
                <img
                    src={logo}
                    alt="summarizer logo"
                    className="w-28 object-contain"
                />

                <button
                    type="button"
                    className="black_btn"
                    onClick={() => {
                        window.open('https://github.com/dalmeidap');
                    }}
                >
                    Github
                </button>
            </nav>

            <h1 className="head_text">
                Summarize articles with <br className="max-md:hidden" />
                <span className="orange_gradient">Open AI GPT-4</span>
            </h1>
            <h2 className="desc">
                Your friendly open-source tool that effortlessly shortens those
                lengthy articles into easy, breezy summaries!
            </h2>
        </header>
    );
};

export default Hero;

import { useEffect, useState } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetArticleQuery } from '../services/article';

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });

    const [getArticle, { data, error, isFetching }] = useLazyGetArticleQuery();
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState('');

    useEffect(() => {
        const articlesSaved = JSON.parse(localStorage.getItem('articles'));
        if (articlesSaved) setAllArticles(articlesSaved);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getArticle({ url: article.url });

        if (data) {
            const newArticle = { ...article, summary: data.summary };
            const updatedArticles = [...allArticles, newArticle];

            setArticle(newArticle);
            setAllArticles(updatedArticles);
            localStorage.setItem('articles', JSON.stringify(updatedArticles));
        }
    };

    const handleCopy = (copiedUrl) => {
        setCopied(copiedUrl);
        navigator.clipboard.writeText(copiedUrl);
        setTimeout(() => setCopied(''), 3000);
    };

    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}
            <div className="flex flex-col gap-2 w-full">
                <form
                    className="relative flex justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt="link icon"
                        className="absolute left-0 my-2 ml-3 w-5 "
                    />

                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={(e) => {
                            setArticle({ ...article, url: e.target.value });
                        }}
                        required
                        className="url_input peer"
                    />

                    <button
                        type="submit"
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        ↵
                    </button>
                </form>

                {/* Browser History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((article, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(article)}
                            className="link_card"
                        >
                            <div
                                className="copy_btn"
                                onClick={() => handleCopy(article.url)}
                            >
                                <img
                                    src={copied === article.url ? tick : copy}
                                    alt="copy icon"
                                    className="w-[40%] h-[40%] object-contain"
                                />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                {article.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Results */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {/* Loading */}
                {isFetching && (
                    <img
                        src={loader}
                        alt="loading"
                        className="w-20 h-20 object-contain"
                    />
                )}

                {/* Error */}
                {!isFetching && error && (
                    <p className="font-inter font-bold text-black text-center">
                        Well, this is embarrassing. We could not find anything
                        for that URL.
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                )}

                {/* Success */}
                {!isFetching && !error && article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article{' '}
                            <span className="blue_gradient">summary</span>
                        </h2>
                        <div className="summary_box">
                            {article.summary.split('\n').map((line, idx) => (
                                <p
                                    key={`paragraph-${idx}`}
                                    className="font-inter font-medium text-sm text-gray-700 mb-3"
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Demo;

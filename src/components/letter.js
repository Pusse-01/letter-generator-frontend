import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUserDataFromLocalStorage } from '../utils'
import API_BASE_URL from '../config';
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';

const Letter = ({ letter }) => {
    const user = getUserDataFromLocalStorage();
    const [statusMessage, setStatusMessage] = useState('');
    const [text, setText] = useState(letter)

    const handleFormat = (format) => {
        document.execCommand(format, false, null);
    };
    const modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [
                { "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }
            ],
        ]
    };

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];


    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setStatusMessage('Letter copied!');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    const handleSaveLetter = async () => {
        console.log(user)
        try {
            const userId = user._id // Replace with your local storage key
            const response = await fetch(`${API_BASE_URL}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    letter: text,
                }),
            });

            if (response.ok) {
                setStatusMessage('Letter saved successfully!');
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                console.error('Error saving letter:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving letter:', error);
        }
    };

    const handleProcedureContentChange = (content) => {
        console.log("content---->", content);
        setText(content)
    };


    return (
        <div className="p-4">
            {letter ? (
                <div>
                    {/* <div className="flex space-x-2 mb-2">
                        <button
                            onClick={() => handleFormat('bold')}
                            className="text-xl"
                        >
                            <MdFormatBold />
                        </button>
                        <button
                            onClick={() => handleFormat('italic')}
                            className="text-xl"
                        >
                            <MdFormatItalic />
                        </button>
                        <button
                            onClick={() => handleFormat('insertunorderedlist')}
                            className="text-xl"
                        >
                            <MdFormatListBulleted />
                        </button>
                        <button
                            onClick={() => handleFormat('insertorderedlist')}
                            className="text-xl"
                        >
                            <MdFormatListNumbered />
                        </button>
                    </div> */}
                    {/* Show the generated letter */}
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={text}
                        onChange={handleProcedureContentChange}
                        style={{ height: '70VH' }}
                    />
                    <div className="flex justify-end space-x-2 mt-12">
                        <button
                            onClick={handleCopyToClipboard}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Copy to clipboard
                        </button>
                        <button
                            onClick={handleSaveLetter}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                    {statusMessage && (
                        <div className="text-sm mt-2 text-green-600">{statusMessage}</div>
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-600">Generate a letter</div>
            )}
        </div>
    );
};

export default Letter;

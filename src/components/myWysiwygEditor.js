import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyWysiwygEditor = ({ onContentChange, cont }) => {
    const [content, setContent] = useState(cont);

    //onContentChange(cont);
    const handleContentChange = (newContent) => {
        setContent(newContent);
        // Вызываем функцию обратного вызова при изменении содержимого
        onContentChange(newContent);
    };

    return (

        <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow" // Тема WYSIWYG (по умолчанию или snow)
            modules={{ // Модули Quill
                toolbar: [
                    ["bold", "italic", "underline"], // Панель инструментов
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    [{ size: ["small", false, "large", "huge"] }], // Размер текста
                    [{ color: [] }], // Цвет текста
                    ["clean"],
                    ["image"],
                    ["video"],
                ],
            }}
        />
    );
};

export default MyWysiwygEditor;
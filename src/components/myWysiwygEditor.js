import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // импортируйте стили Quill

const MyWysiwygEditor = ({ onContentChange }) => {
    const [content, setContent] = useState("");

    const handleContentChange = (newContent) => {
        setContent(newContent);
        onContentChange(newContent); // Вызываем функцию обратного вызова при изменении содержимого
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
                ],
            }}
        />
    );
};

export default MyWysiwygEditor;
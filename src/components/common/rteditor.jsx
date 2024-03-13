import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    let Font = RQ.Quill.import("formats/font");
    Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];

    RQ.Quill.register(Font, true);

    // const modules = {
    //   toolbar: [
    //     [{ font: Font.whitelist }],
    //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //   ],
    // };

    // return ({ forwardedRef, ...props }) => (
    //   <RQ modules={modules} ref={forwardedRef} {...props} />
    // );

    // RQ.Quill.register(Font, true);

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef } from "react";

export default function RTEditor({ content, onChange }) {
  const quillRef = useRef(false);

  const modules = useMemo(
    () => ({
      history: {
        delay: 2000,
        maxStack: 300,
        userOnly: true,
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
        ],
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "code",
    "script",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      forwardedRef={quillRef}
      theme="snow"
      value={content}
      onChange={onChange}
      formats={formats}
      modules={modules}
    />
  );
}

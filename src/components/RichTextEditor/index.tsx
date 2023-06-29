/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row } from "antd";
import { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const RichTextEditor = ({
  initialTempVar = [],
  defaultValue = "",
  onChange,
}: any) => {
  const [tempVar] = useState(initialTempVar);

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };

  return (
    <Card className="richtext">
      <Row>
        <SunEditor
          defaultValue={defaultValue}
          setOptions={{
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link"],
              ["preview"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
          getSunEditorInstance={getSunEditorInstance}
          height="60vh"
          onChange={onChange}
        />
      </Row>
      <Row>
        {tempVar?.map((variable: any, index: number) => (
          <span className="m-10" key={index}>
            {variable}
          </span>
        ))}
      </Row>
    </Card>
  );
};
export default RichTextEditor;

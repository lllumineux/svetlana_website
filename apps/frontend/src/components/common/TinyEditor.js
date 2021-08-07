import React, { Component } from "react";
import {Editor} from "@tinymce/tinymce-react";

class TinyEditor extends Component {
  render() {
    return <Editor apiKey="ljh5ud1t395iha2irxyvff2cdnjehwnubw3gpufxv7a9z2pw"
                init={{
                    selector: "#myTextarea",
                    menubar: "edit insert format tools",
                    plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code " +
                        "fullscreen insertdatetime media table paste code help wordcount spellchecker",
                    toolbar: "undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft " +
                        "aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor " +
                        "backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | " +
                        "fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | " +
                        "a11ycheck ltr rtl | showcomments addcomment code"
                }}
            />
  }
}

export default TinyEditor;

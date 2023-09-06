import React, { useEffect } from 'react'
import {useDispatch} from "react-redux";
import { ErrorMessage } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, convertFromHTML, EditorState } from 'draft-js';

const TextEditorFormikField = ({listOnly, fieldName, formProps,defaultState, label_text}) => {

    const dispatch = useDispatch()

    const onEditorStateChange = (e) => {

        const Content = e.getCurrentContent()
        const rawContent = convertToRaw(e.getCurrentContent()) //converting editor's text into raw data
        formProps.setFieldValue(fieldName, draftToHtml(rawContent));

  
    }

    useEffect(()=>{

      console.log("jjjj",formProps.getFieldMeta(fieldName).value)

    },[])
      
  return (
      <>
      <label className="ml-1 text-sm block font-medium text-gray-500">
          {label_text}
      </label>
        <Editor
      defaultEditorState={defaultState}
      toolbarClassName="toolbarClassName -mt-4"
      wrapperClassName=" "
      editorClassName="border-2 border-gray-100 px-2"
      onEditorStateChange={(e)=>{onEditorStateChange(e)}}
      toolbar={{
        options: listOnly ? ['list',] : ['inline', 'fontSize', 'list',],
        textAlign: {
          inDropdown: false,
        }
      }}
      />

      <p className="text-red-500 text-xs">
      <ErrorMessage name={fieldName} />
      </p>
      </>
  )
}

export default TextEditorFormikField
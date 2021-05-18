import React from "react";
import ReactTags from "react-tag-autocomplete";
// import countries from "../constants/countries";

const TagInput = ({ tags, setTags, keywords }) => {

  function reactTags() {
    return React.createRef();
  }

  function onDelete(i) {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  }
  function onAddition(newTag) {
    const newTags = [].concat(tags, newTag);
    setTags(newTags);
  }

  function onValidate(tag) {
    return /^[a-z]{3,12}$/i.test(tag.name);
  }

  return (
    <div>
      <ReactTags
        allowNew={true}
        ref={reactTags}
        tags={tags}
        suggestions={keywords}
        NoSuggestionsText="No suggestion found"
        onDelete={onDelete}
        onAddition={onAddition}
        onValidate={onValidate}
      />
      <p>
        <small>
          <em>
            Tags must be 3-12 characters in length and only contain the letters
            A-Z
          </em>
        </small>
      </p>
    </div>
  );
};

export default TagInput;

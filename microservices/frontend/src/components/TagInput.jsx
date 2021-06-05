import React from 'react';
import ReactTags from 'react-tag-autocomplete';
// import countries from "../constants/countries";
import PropTypes from 'prop-types';

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
    return /^[a-z0-9-]{3,12}$/i.test(tag.name);
  }

  return (
    <div>
      <ReactTags
        allowNew
        ref={reactTags}
        tags={tags}
        suggestions={keywords}
        NoSuggestionsText='No suggestion found'
        onDelete={onDelete}
        onAddition={onAddition}
        onValidate={onValidate}
        delimiters={['Enter', 'Tab', ' ']}
      />
      <p>
        <small>
          <em>
            Tags must be 3-20 characters in length and only contain the letters
            A-Z,numbers or hyphens(-)
          </em>
        </small>
      </p>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      keyword_id: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      keyword_id: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;

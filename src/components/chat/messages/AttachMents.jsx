import { AttachmentIcon } from '../../../svg';
import AtachmentMenu from './AtachmentMenu';
import { useState } from 'react';

export default function AttachMents({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowPicker(false);
          setShowAttachments((prev) => !prev);
        }}
        type="button"
        className="btn"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1"></AttachmentIcon>
      </button>
      {showAttachments ? <AtachmentMenu></AtachmentMenu> : null}
    </li>
  );
}

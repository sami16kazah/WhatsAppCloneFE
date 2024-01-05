import { useState } from 'react';
import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from '../../../svg';
import PhotoAttachment from './attachments/PhotoAttachment';
import DocumentAttachment from './attachments/DocumetnAttachment';

export default function AtachmentMenu() {
  return (
    <ul className="absolute bottom-14 openEmojiAnimtion ">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon></PollIcon>
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full bg-[#0EABF4]">
          <ContactIcon></ContactIcon>
        </button>
      </li>
      <DocumentAttachment></DocumentAttachment>
      <li>
        <button type="button" className="rounded-full bg-[#D3396D]">
          <CameraIcon></CameraIcon>
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon></StickerIcon>
        </button>
      </li>
      <PhotoAttachment></PhotoAttachment>
    </ul>
  );
}

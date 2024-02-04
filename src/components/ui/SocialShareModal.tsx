'use client';

import { useEffect, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from 'react-share';
import { Icon, Modal } from '.';

type ModalProps = {
  open: boolean;
  onClose(): void;
};

const ShareSocialModal = ({ open, onClose }: ModalProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const location = window.location.href;
    setUrl(location);
  }, []);

  const copyShareHandler = () => {
    const location = window.location.href;
    window.navigator.clipboard.writeText(location);
    onClose();
  };

  return (
    <Modal onClose={onClose} open={open}>
      <ul className="flex gap-4">
        <li>
          <FacebookShareButton url={url}>
            <FacebookIcon size={45} round />
          </FacebookShareButton>
        </li>
        <li>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={45} round />
          </WhatsappShareButton>
        </li>
        <li>
          <TwitterShareButton url={url}>
            <XIcon size={45} round />
          </TwitterShareButton>
        </li>
        <li>
          <PinterestShareButton url={url} media="type/image">
            <PinterestIcon size={45} round />
          </PinterestShareButton>
        </li>
        <li>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={45} round />
          </LinkedinShareButton>
        </li>
        <li>
          <EmailShareButton url={url}>
            <EmailIcon size={45} round />
          </EmailShareButton>
        </li>
        <li>
          <Icon name="copy" size="45" handleClick={copyShareHandler} />
        </li>
      </ul>
    </Modal>
  );
};

export default ShareSocialModal;

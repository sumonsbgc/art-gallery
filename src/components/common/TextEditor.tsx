'use client';

import React, { useMemo, Dispatch, SetStateAction, useEffect } from 'react';

// slate
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

export const initText = [{ children: [{ text: '' }] }];

type TextEditorProps = {
  value: Descendant[];
  onChange: Dispatch<SetStateAction<Descendant[]>>;
  className?: string;
  placeholder?: string;
};

const TextEditor = ({
  value,
  onChange,
  className = '',
  placeholder = 'Enter some plain text...'
}: TextEditorProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // const [value, setValue] = useState<Descendant[]>([{ children: [{ text: 'hi' }] }]);

  useEffect(() => {
    if (JSON.stringify(value) === JSON.stringify(initText)) {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, [])
        }
      });
    }
  }, [editor, value]);

  return (
    <Slate
      editor={editor}
      initialValue={value}
      // value={value}
      onChange={(_value) => onChange(_value)}
    >
      <Editable placeholder={placeholder} className={className} />
    </Slate>
  );
};

export default TextEditor;

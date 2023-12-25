import { useState } from 'react';
import showdown from 'showdown';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MDEditor, { commands } from '@uiw/react-md-editor';

const htmlToMarkdown = (str) => {
  const converter = new showdown.Converter();
  let md = converter.makeMarkdown(str);
  md = md.replace(/\n<!--[\s\S]*?-->\n/g, '');
  md = md.trim();
  return md;
};

const markdownToHtml = (str) => {
  const converter = new showdown.Converter({
    noHeaderId: true,
    ghCodeBlocks: false,
  });
  let html = converter.makeHtml(str);
  html = html.trim();
  return html;
};

export default function CInputMD({
  label = '',
  required,
  size,
  error,
  helperText,
  name,
  value,
  onChange,
}) {
  const [input, setInput] = useState(htmlToMarkdown(value));

  const handleBlur = () => {
    const newValue = markdownToHtml(input);
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <FormControl
      fullWidth
      size={size}
      required={required}
      error={error}
      data-color-mode="light"
    >
      <FormLabel sx={{ fontSize: '0.75em', ml: 1.5, mb: 1 }}>
        {label}
      </FormLabel>
      {/* <div className="wmde-markdown-var" /> */}
      <MDEditor
        value={input}
        preview="edit"
        commands={[
          commands.bold,
          commands.italic,
          commands.hr,
          commands.group([
            commands.title2,
            commands.title3,
            commands.title4,
            commands.title5,
            commands.title6,
          ], {
            name: 'title',
            groupName: 'title',
            buttonProps: { 'aria-label': 'Insert title' },
          }),
          commands.divider,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          commands.divider,
          commands.link,
        ]}
        extraCommands={[
          commands.codeEdit,
          commands.codePreview,
        ]}
        onChange={setInput}
        onBlur={handleBlur}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

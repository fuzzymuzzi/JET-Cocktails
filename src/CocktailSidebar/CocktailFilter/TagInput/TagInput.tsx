import { Box, Keyboard, TextInput, TextInputProps } from 'grommet'
import { ChangeEvent, useRef, useState } from 'react'
import Tag from './Tag'

interface ITagInputProps extends Omit<TextInputProps, 'onChange'> {
  selectedTags: string[]
  onAdd: (tag: string) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRemove: (tag: string) => void
}
const TagInput: React.FC<ITagInputProps> = ({
  placeholder,
  selectedTags = [],
  onAdd,
  onChange,
  onRemove,
  ...props
}) => {
  const [currentTag, setCurrentTag] = useState('')
  const boxRef = useRef()

  const updateCurrentTag = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }

  const onAddTag = (tag: string) => {
    if (onAdd) {
      onAdd(tag)
    }
  }

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag)
      setCurrentTag('')
    }
  }

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction='row'
        align='center'
        pad={{ horizontal: 'xsmall' }}
        border='all'
        // @ts-ignore
        ref={boxRef}
        wrap
        fill
      >
        {selectedTags.map((tag: string, index: number) => (
          <Tag
            margin='xsmall'
            key={`${tag}${index + 0}`}
            onRemove={() => onRemove(tag)}
            data-testid={'tag-input-tag'}
          >
            {tag}
          </Tag>
        ))}
        <Box flex style={{ minWidth: '120px' }}>
          <TextInput
            type='search'
            placeholder={placeholder}
            plain
            dropTarget={boxRef.current}
            {...props}
            onChange={updateCurrentTag}
            value={currentTag}
            onSuggestionSelect={event => onAddTag(event.suggestion)}
          />
        </Box>
      </Box>
    </Keyboard>
  )
}

export default TagInput

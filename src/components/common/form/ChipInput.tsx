import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props<T extends number | string> {
  idPrefix: string;
  label: string;
  possibleValues: T[];
  selectedValues: T[];
  defaultValues?: T[];
  codeRecord?: Record<T, string>;
  handleSelectedChange: (event: SelectChangeEvent<T[]>) => void;
}

function getStyles<T>(selected: T, selects: readonly T[], theme: Theme) {
  return {
    fontWeight: selects.includes(selected)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const ChipInput = <T extends number | string>({
  idPrefix,
  label,
  possibleValues,
  selectedValues,
  defaultValues = [],
  codeRecord,
  handleSelectedChange,
}: Props<T>) => {
  const theme = useTheme();

  return (
    <>
      <InputLabel id={`${idPrefix}-label`}>{label}</InputLabel>
      <Select
        labelId={`${idPrefix}-label`}
        id={`${idPrefix}-select"`}
        label={label}
        multiple
        defaultValue={defaultValues}
        value={selectedValues}
        onChange={handleSelectedChange}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => {
              const chipLabel = codeRecord?.[value] ?? value;
              return <Chip size="small" key={value} label={chipLabel} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {possibleValues.map(value => {
          const friendlyName = codeRecord?.[value] ?? value;
          return (
            <MenuItem
              key={value}
              value={friendlyName}
              style={getStyles(value, selectedValues, theme)}
            >
              {friendlyName}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default ChipInput;

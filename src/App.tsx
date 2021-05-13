import { Stack, TextField, Checkbox, DefaultButton, DatePicker, mergeStyles, IStackStyles, IStackTokens, DefaultPalette } from '@fluentui/react';
import React, { useState } from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 400 },
};

const stackStyles: IStackStyles = {
  root: {
  },
};

const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 100,
};

const options: IDropdownOption[] = [
  { key: 'Hlavní město Praha', text: 'Hlavní město Praha' },
  { key: 'Středočeský kraj', text: 'Středočeský kraj' },
  { key: 'Jihočeský kraj', text: 'Jihočeský kraj' },
  { key: 'Plzeňský kraj', text: 'Plzeňský kraj' },
  { key: 'Karlovarský kraj', text: 'Karlovarský kraj' },
  { key: 'Ústecký kraj', text: 'Ústecký kraj' },
  { key: 'Liberecký kraj', text: 'Liberecký kraj' },
  { key: 'Královéhradecký kraj', text: 'Královéhradecký kraj' },
  { key: 'Pardubický kraj', text: 'Pardubický kraj' },
  { key: 'Kraj Vysočina', text: 'Kraj Vysočina' },
  { key: 'Jihomoravský kraj', text: 'Jihomoravský kraj' },
  { key: 'Olomoucký kraj', text: 'Olomoucký kraj' },
  { key: 'Zlínský kraj', text: 'Zlínský kraj' },
  { key: 'Moravskoslezský kraj', text: 'Moravskoslezský kraj' },
];

const rootClass = mergeStyles({ maxWidth: 400, selectors: { '> *': { marginBottom: 15 } } });

function App() {

  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date('May 13, 2021 17:05:00'));
  const [kraj, setKraj] = useState<IDropdownOption>();
  const [react, setReact] = useState(false);
  const [multi, setMulti] = useState("");

  return (
    <Stack className={rootClass}>
      <Stack horizontal styles={stackStyles} tokens={horizontalGapStackTokens}>
        <TextField label="Jméno" value={jmeno} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setJmeno(String(newValue))}></TextField>
        <TextField label="Příjmení" value={prijmeni} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPrijmeni(String(newValue))}></TextField>
      </Stack>

      <Stack horizontal styles={stackStyles} tokens={horizontalGapStackTokens}>
        <TextField label="E-mail" value={email} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setEmail(String(newValue))}></TextField>
        <DatePicker label="Datum narození" value={date} onSelectDate={(date: Date | null | undefined) => date && setDate(date)}/>
      </Stack>

      <Dropdown
        label="Kraj"
        options={options}
        styles={dropdownStyles}
        selectedKey={kraj?.key as string}
        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => option && setKraj(option)}
      />

      <Checkbox label="REACT" checked={react} onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => setReact(Boolean(checked))} />

      <Stack horizontal styles={stackStyles} tokens={horizontalGapStackTokens}>
        <DefaultButton text="Uložit" onClick={() => setMulti(JSON.stringify({jmeno, prijmeni, email, date, kraj, react}))} />
        <DefaultButton text="Načíst" onClick={multi => setAll()} />
      </Stack>

      <TextField multiline rows={7} value={multi} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setMulti(String(newValue))}/>
    </Stack>
  );

  function setAll() {
    var result = JSON.parse(String(multi));
    setJmeno(result.jmeno);
    setPrijmeni(result.prijmeni);
    setEmail(result.email);
    setDate(new Date(result.date));
    setKraj(result.kraj);
    setReact(result.react);
  };
}

export default App;

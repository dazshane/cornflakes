import { Stack, TextField, Checkbox, DefaultButton, DatePicker, mergeStyles, IStackStyles, IStackTokens,
   MessageBar, MessageBarType, Image, IImageProps, ImageFit} from '@fluentui/react';
import React, { useState } from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 500 },
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

function App(): JSX.Element {

  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [kraj, setKraj] = useState<IDropdownOption | null>(null);
  const [react, setReact] = useState(false);
  const [multi, setMulti] = useState("");

  const [emailerror, setEmailError] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [jsonerror, setJsonError] = useState(false);

  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const imageProps: IImageProps = {
    imageFit: ImageFit.contain,
    src: 'logo192.png',
    // Show a border around the image (just for demonstration purposes)
    styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
  };

  return (
    <Stack>

      <Stack horizontal>
        <Stack.Item align="center">
          <Image
            {...imageProps}
            alt='Example of the image fit value "contain" on an image wider than the frame.'
            width={100}
            height={100}
          />
        </Stack.Item>
        <Stack.Item align="center">
          NADPIS
        </Stack.Item>
      </Stack>

      <Stack wrap>
        <Stack.Item>
          <TextField label="Jméno" value={jmeno} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setJmeno(String(newValue))}></TextField>
        </Stack.Item>

        <Stack.Item>
          <TextField label="Příjmení" value={prijmeni} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPrijmeni(String(newValue))}></TextField>
        </Stack.Item>
      </Stack>

      <Stack wrap>
        <Stack.Item>
          <TextField label="E-mail" value={email} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {setEmail(String(newValue))}}></TextField>
        </Stack.Item>
        <Stack.Item>
          <DatePicker label="Datum narození" value={date===null?undefined:date} onSelectDate={(date: Date | null | undefined) => date && setDate(date)}/>
        </Stack.Item>
      </Stack>

      <Stack.Item>
        <Dropdown
          label="Kraj"
          options={options}
          styles={dropdownStyles}
          selectedKey={kraj===null?null:kraj.key as string}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => option && setKraj(option)}
        />
      </Stack.Item>

      <Stack.Item>
        <Checkbox label="REACT" checked={react} onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => setReact(Boolean(checked))} />
      </Stack.Item>

      <Stack horizontal>
        <Stack.Item>
          <DefaultButton text="Uložit" onClick={() => check()} />
        </Stack.Item>
        <Stack.Item>
          <DefaultButton text="Načíst" onClick={multi => setAll()} />
        </Stack.Item>
      </Stack>

      <Stack.Item>
        <TextField multiline rows={7} value={multi} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setMulti(String(newValue))}/>
      </Stack.Item>

      {emailerror? <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        onDismiss={() => setEmailError(false)}
        dismissButtonAriaLabel="Close"
      >
        Error: Špatný formát E-mailu (správný formát: jméno@domain)
      </MessageBar>:null}

      {confirm? <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={false}
        onDismiss={() => setConfirm(false)}
        dismissButtonAriaLabel="Close"
      >
        Uložení proběhlo úspěšně
      </MessageBar>:null}

      {jsonerror? <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        onDismiss={() => setJsonError(false)}
        dismissButtonAriaLabel="Close"
      >
        Error: Invalid Json
      </MessageBar>:null}

    </Stack>
  );

  function setAll() {
    if (multi !== '')
    {
      var result = JSON.parse(String(multi));
      setMulti("");

      if (result.jmeno === undefined || result.prijmeni === undefined || result.email === undefined || result.date === undefined || result.kraj === undefined || result.react === undefined)
      {
        setJsonError(true);
      }
      else
      {
        setJmeno(result.jmeno);
        setPrijmeni(result.prijmeni);
        setEmail(result.email);
        setDate(new Date(result.date) as Date);
        setKraj(result.kraj);
        setReact(result.react);
      }
    }
  };

  function check() {
    if (re.test(email)) {
      setMulti(JSON.stringify({jmeno, prijmeni, email, date, kraj, react}));
      setJmeno("");
      setPrijmeni("");
      setEmail("");
      setDate(null);
      setKraj(null);
      setReact(false);
      setConfirm(true);
    }
    else {
      setEmailError(true);
    }
  }
}

export default App;

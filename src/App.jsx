import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import Button from '@mui/material/Button';
import { Dialog, Divider, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [seedSize, setSeedSize] = useState(12);
  const [openModal, setOpenModal] = useState(false);
  const [openCopySnack, setOpenCopySnack] = useState(false);
  const [encrypting, setEncrypting] = useState(true);
  const [words, setWords] = useState(Array.from({ length: 12 }, () => ""));
  const [phrase, setPhrase] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [showPassword4, setShowPassword4] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [password4, setPassword4] = useState("");
  const [passwordCriterias, setPasswordCriterias] = useState(false);

  function encrypt(phrase, password1, password2) {
    const encryptedMessage = CryptoJS.AES.encrypt(phrase, password1).toString();
    const encryptedFinalMessage = CryptoJS.AES.encrypt(encryptedMessage, password2).toString();
    return encryptedFinalMessage;

  }

  function decrypt(phrase, password1, password2) {
    const decryptedMessage = CryptoJS.AES.decrypt(phrase, password2).toString(CryptoJS.enc.Utf8);
    const decryptedFinalMessage = CryptoJS.AES.decrypt(decryptedMessage, password1).toString(CryptoJS.enc.Utf8);
    return decryptedFinalMessage;

  }

  function wordsToString() {
    let text = "";
    words.map(e => {
      text += ", " + e;
    })
    text = text.substring(1)
    return text;
  }

  useEffect(() => {
    setWords(Array.from({ length: seedSize }, () => ""))
    setPhrase("")
  }, [seedSize, encrypting])

  useEffect(() => {

    if (Boolean(password === password2 && password.length > 0 &&
      password.length > 7 &&
      password.match(/\d/) &&
      password.match(/[A-Z]/) &&
      password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) &&
      password3 === password4 && password3.length > 0 &&
      password3.length > 7 &&
      password3.match(/\d/) &&
      password3.match(/[A-Z]/) &&
      password3.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) &&
      password != password3) {
      setPasswordCriterias(true);
    }
    else {
      setPasswordCriterias(false);
    }

  }, [password, password2, password3, password4])

  return (
    <>
      <Dialog onClose={() => { setOpenModal(false) }} open={openModal}>
        <div className='flex flex-col py-5 px-5 gap-6 border-2 border-primary rounded-md bg-white'>
          <div className='w-full flex justify-center items-center'>
            <span className='text-primary font-bold'>
              {encrypting ? "Encrypted Text" : "Decrypted Phrase"}
            </span>
          </div>
          {encrypting ?
            <div className='flex items-center justify-center border-2 border-primary rounded-md'>
              <p className='break-all px-2 py-1 border-r-2 border-primary' id="encryptedtext">{encryptedText}</p>
              <button className='text-primary rounded-lg m-2 p-1 hover:bg-primary hover:text-white' onClick={() => { navigator.clipboard.writeText(encryptedText); setOpenCopySnack(true) }}><ContentCopyIcon />
              </button>
            </div>
            :
            <div className='flex items-center justify-center border-2 border-primary rounded-md'>
              <p className='px-2 py-1 border-primary' id="encryptedtext">{decryptedText}.</p>
            </div>
          }
          <div className='flex flex-col'>
            <span className='text-primary font-bold'>Notes:</span>
            {encrypting ?
              <ul class="list-disc list-inside marker:text-primary">
                <li>a</li>
                <li>a</li>
              </ul>
              :
              <></>
            }
          </div>
        </div>
      </Dialog >

      <Snackbar
        open={openCopySnack}
        autoHideDuration={3000}
        message="Text copied to clipboard!"
        onClose={() => { setOpenCopySnack(false) }}
      />

      <FormControl className='w-full flex items-center'>
        <div className='bg-white flex flex-col gap-5 w-5/6 sm:w-4/6 md:w-7/12 lg:w-2/4 xl:w-5/12 2xl:w-4/12 items-center justify-center border-[1px] my-16 border-primary py-8 px-5 rounded-3xl'>
          <div className='flex items-center justify-center text-primary font-bold gap-1'>
            <IconButton aria-label="github" href="https://github.com/andreimattos06/SeedPhraseEncrypter" target="_blank">
              <GitHubIcon className='text-primary'/>
            </IconButton>
            <span>Seed Phrase Encrypter</span>
            <Tooltip disableFocusListener className='animate-bounce' placement="left-end" arrow title={
              <div className='flex flex-col gap-3 px-2 py-2'>
                <div>
                  <span className='font-bold text-base'>How it works:</span>
                  <ul class="list-disc list-inside text-justify">
                    <li>ALL transactions are running locally, which means that ALL information needed to encrypt or decrypt isn't being sent to any server or external resources.</li>
                    <li>After the page is fully loaded, you can even run it disconnected from the internet to ensure that the data isn't being sent anywhere.</li>
                    <li>It's open source. You can view the code or even make a copy to ensure you can decrypt anytime you want.</li>
                    <li>It uses the AES algorithm to encrypt the data, which means it's very secure and extremely difficult to break. It's almost immune to conventional attacks.</li>
                  </ul>
                </div>
                <div>
                  <span className='font-bold text-base'>How to use:</span>
                  <ol class="list-decimal list-inside">
                    <li>Select the type of transaction you want: encrypt or decrypt.</li>
                    <li>Fill in the information.</li>
                    <li>Fill in the password fields, paying attention to the prerequisites. It requires two passwords for security reasons.</li>
                  </ol>
                </div>
                <div>
                  <span className='font-bold text-base'>Security Hints:</span>
                  <ol class="list-disc list-inside">
                    <li>Open the page in incognito mode to ensure that unauthorized software or plugins do not access the inputted data.</li>
                    <li>Make sure your computer is free of viruses and/or malicious software.</li>
                    <li>The longer the password, number of numbers and special characters, the more secure the password will be.</li>
                  </ol>
                </div>
              </div>
            }>
              <IconButton>
                <InfoOutlinedIcon className='text-primary' />
              </IconButton>
            </Tooltip>
          </div>
          <div className='flex items-center justify-center'>
            <RadioGroup
              aria-labelledby="radio-group"
              defaultValue="encrypt"
              name="radio-group"
              row
              value={encrypting}
              onChange={(e) => { setEncrypting(!encrypting) }} >
              <FormControlLabel value={true} control={<Radio />} label="Encrypt" />
              <FormControlLabel value={false} control={<Radio />} label="Decrypt" />
            </RadioGroup>
          </div>
          {encrypting ?
            <div>
              <div className='flex flex-col items-center justify-center mb-5'>
                <span className='text-primary font-bold'>Seed Size:</span>
                <Select
                  sx={{ m: 1, minWidth: 120 }} size="small"
                  labelId="select-label"
                  id="simple-select"
                  value={seedSize}
                  label="Seed Size"
                  onChange={(e) => { setSeedSize(e.target.value) }}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </div>
              <Divider orientation="horizontal" flexItem />
              <div className='flex items-center justify-center text-primary font-bold mt-5'>
                <span>Word List:</span>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5'>
                {words.map((word, index) => (
                  <TextField key={index} id={"input" + index} variant="standard" value={word} onChange={(e) => setWords(prev => {
                    let copy = [...prev]
                    copy[index] = e.target.value
                    return copy;
                  })} />
                ))}
              </div>
            </div>
            :
            <div className='w-full'>
              <div className='flex w-full items-center justify-center'>
                <TextField
                  className='w-full px-5'
                  id="multiline-flexible"
                  label="Enter the Encrypted Text"
                  multiline
                  value={phrase}
                  onChange={(e) => { setPhrase(e.target.value) }}
                  maxRows={6}
                  variant="standard"
                />
              </div>
            </div>
          }

          <Divider orientation="horizontal" flexItem />
          <div className='flex items-center justify-center text-primary font-bold'>
            <span>Passwords:</span>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>First Password:</span>
              <FormControl>
                <Input
                  id="password1"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => { setPassword(e.target.value) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>Confirmation:</span>
              <FormControl>
                <Input
                  onChange={(e) => { setPassword2(e.target.value) }}
                  id="password2"
                  type={showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword2(!showPassword2)}
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className='flex flex-col gap-[2px] text-xs items-start self-start ml-4'>
            <span className={((password === password2 && password.length > 0) ? "text-greenright" : "text-redwarning")}>Passwords must match.</span>
            <span className={(password.length > 7 ? "text-greenright" : "text-redwarning")}>Must have at least 8 digits.</span>
            <span className={(password.match(/\d/) ? "text-greenright" : "text-redwarning")}>Password must have at least one number.</span>
            <span className={(password.match(/[A-Z]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one capital letter.</span>
            <span className={(password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one special character.</span>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>Second Password:</span>
              <FormControl>
                <Input
                  id="password3"
                  type={showPassword3 ? 'text' : 'password'}
                  onChange={(e) => { setPassword3(e.target.value) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword3(!showPassword3)}
                      >
                        {showPassword3 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>Confirmation:</span>
              <FormControl>
                <Input
                  id="password4"
                  type={showPassword4 ? 'text' : 'password'}
                  onChange={(e) => { setPassword4(e.target.value) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword4(!showPassword4)}
                      >
                        {showPassword4 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className='flex flex-col gap-[2px] text-xs items-start self-start ml-4'>
            <span className={((password3 === password4 && password3.length > 0) ? "text-greenright" : "text-redwarning")}>Passwords must match.</span>
            <span className={(password3.length > 7 ? "text-greenright" : "text-redwarning")}>Must have at least 8 digits.</span>
            <span className={(password3.match(/\d/) ? "text-greenright" : "text-redwarning")}>Password must have at least one number.</span>
            <span className={(password3.match(/[A-Z]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one capital letter.</span>
            <span className={(password3.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one special character.</span>
            <span className={(password != password3 ? "text-greenright" : "text-redwarning")}>Passwords must be different.</span>
          </div>
          <div className='mt-10'>
            {encrypting ?
              <Button
                onClick={() => {
                  setEncryptedText(encrypt(wordsToString(), password, password3))
                  setOpenModal(true)
                }}
                variant="contained"
                disabled={!passwordCriterias}>
                Encrypt
              </Button>
              :
              <Button
                onClick={() => {
                  setOpenModal(true)
                  setDecryptedText(decrypt(phrase, password, password3))
                }}
                variant="contained"
                disabled={!passwordCriterias}>
                Decrypt
              </Button>
            }
          </div>
        </div>
      </FormControl>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function App() {
  const [seedSize, setSeedSize] = useState(12);
  const [openModal, setOpenModal] = useState(false);
  const [openCopySnack, setOpenCopySnack] = useState(false);
  const [transaction, setTransaction] = useState("encrypt");
  const [words, setWords] = useState(Array.from({ length: 12 }, () => ""));
  const [encryptedText, setEncryptedText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [showPassword4, setShowPassword4] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [password4, setPassword4] = useState("");

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
      text += "," + e;
    })
    text = text.substring(1)
    return text;
  }

  useEffect(() => {
    setWords(Array.from({ length: seedSize }, () => ""))
  }, [seedSize, transaction])

  return (
    <>
      
      <Dialog open={openModal}>
        <div className='flex flex-col py-5 px-5 gap-6 border-2 border-primary rounded-md bg-white'>
          <div className='w-full flex justify-center items-center'>
            <span className='text-primary font-bold'>
              Encrypted Text
            </span>
          </div>
          <div className='flex items-center justify-center border-2 border-primary rounded-md'>
            <p className='break-all px-2 py-1 border-r-2 border-primary' id="encryptedtext">{encryptedText}</p>
            <button className='text-primary rounded-lg m-2 p-1 hover:bg-primary hover:text-white' onClick={() => { navigator.clipboard.writeText(encryptedText); setOpenCopySnack(true) }}><ContentCopyIcon />
            </button>
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={openCopySnack}
        autoHideDuration={3000}
        message="Text copied to clipboard!"
        onClose={() => {setOpenCopySnack(false)}}
      />

      <FormControl className='w-full flex items-center'>
        <div className='flex flex-col gap-5 w-5/6 sm:w-4/6 md:w-7/12 lg:w-2/4 xl:w-5/12 2xl:w-4/12 items-center justify-center border-[1px] mt-16 border-primary py-8 px-5 rounded-3xl'>
          <div className='flex items-center justify-center text-primary font-bold'>
            <span>Seed Phrase Encrypter</span>
          </div>
          <div className='flex items-center justify-center'>
            <RadioGroup
              aria-labelledby="transaction-radio-group"
              defaultValue="encrypt"
              name="transaction-radio-group"
              row
              value={transaction}
              onChange={(e) => { setTransaction(e.target.value) }} >
              <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
              <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
            </RadioGroup>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-primary font-bold'>Seed Size:</span>
            <Select
              sx={{ m: 1, minWidth: 120 }} size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
          <div className='flex items-center justify-center text-primary font-bold'>
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
          <Divider orientation="horizontal" flexItem />
          <div className='flex items-center justify-center text-primary font-bold'>
            <span>Passwords:</span>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>First Password:</span>
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
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>Confirmation:</span>
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
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-primary text-sm'>Confirmation:</span>
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
            </div>
          </div>
          <div className='flex flex-col gap-[2px] text-xs items-start self-start ml-4'>
            <span className={((password3 === password4 && password3.length > 0) ? "text-greenright" : "text-redwarning")}>Passwords must match.</span>
            <span className={(password3.length > 7 ? "text-greenright" : "text-redwarning")}>Must have at least 8 digits.</span>
            <span className={(password3.match(/\d/) ? "text-greenright" : "text-redwarning")}>Password must have at least one number.</span>
            <span className={(password3.match(/[A-Z]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one capital letter.</span>
            <span className={(password3.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) ? "text-greenright" : "text-redwarning")}>Password must have at least one special character.</span>
          </div>
          <div className='mt-10'>
            <Button onClick={() => {
              setEncryptedText(encrypt(wordsToString(), password, password3))
              setOpenModal(true)
            }} variant="contained">{transaction}</Button>
          </div>
        </div>
      </FormControl>
      <div className=''>
      </div>
    </>
  )
}

export default App

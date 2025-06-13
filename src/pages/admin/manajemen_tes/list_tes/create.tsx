import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Button, Card, CardContent, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react';
import { Editor } from '@tinymce/tinymce-react';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Iconly } from 'react-iconly';
import { useNavigate } from 'react-router-dom';
import { snackbarType } from '../../../../interface/snackbar.interface';
import Layout from '../../../../components/Layout';
import UseSwitchesCustom from '../../../../components/atoms/Switch';

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

export default function CreateListTes(props: snackbarProps) {
    const { showSnackBar, setShowSnackbar } = props;
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState()
    const [thumbnail, setThumbnail] = useState('')
    const [preview, setPreview] = useState<any>()
    const [category, setCategory] = useState<any[]>([])
    const [kategoriTes, setKategoriTes] = useState<any[]>([])
    const handleChangeImage = (event: any) => {
        const fileObject = event.target.files[0];
        setSelectedFile(fileObject)
    };
    const advtemplate_templates = [
        {
            title: 'Quick replies',
            items: [
                {
                    title: 'Message received',
                    content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">Just a quick note to say we&rsquo;ve received your message, and will get back to you within 48 hours.</p>\n<p dir="ltr">For reference, your ticket number is: {{Ticket.Number}}</p>\n<p dir="ltr">Should you have any questions in the meantime, just reply to this email and it will be attached to this ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Regards,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
                },
                {
                    title: 'Thanks for the feedback',
                    content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We appreciate you taking the time to provide feedback on {{Product.Name}}.</p>\n<p dir="ltr">It sounds like it wasn&rsquo;t able to fully meet your expectations, for which we apologize. Rest assured our team looks at each piece of feedback and uses it to decide what to focus on next with {{Product.Name}}.</p>\n<p dir="ltr"><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best, and let us know if there&rsquo;s anything else we can do to help.</p>\n<p dir="ltr">-{{Agent.FirstName}}</p>'
                },
                {
                    title: 'Still working on case',
                    content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">Just a quick note to let you know we&rsquo;re still working on your case. It&rsquo;s taking a bit longer than we hoped, but we&rsquo;re aiming to get you an answer in the next 48 hours.</p>\n<p dir="ltr">Stay tuned,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
                }
            ]
        },
        {
            title: 'Closing tickets',
            items: [
                {
                    title: 'Closing ticket',
                    content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We haven&rsquo;t heard back from you in over a week, so we have gone ahead and closed your ticket number {{Ticket.Number}}.</p>\n<p dir="ltr">If you&rsquo;re still running into issues, not to worry, just reply to this email and we will re-open your ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
                },
                {
                    title: 'Post-call survey',
                    content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">How did we do?</p>\n<p dir="ltr">If you have a few moments, we&rsquo;d love you to fill out our post-support survey: {{Survey.Link}}</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks in advance!<br>{{Company.Name}} Customer Support</p>'
                }
            ]
        },
        {
            title: 'Product support',
            items: [
                {
                    title: 'How to find model number',
                    content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">My name is {{Agent.FirstName}} and I will be glad to assist you today.</p>\n<p dir="ltr">To troubleshoot your issue, we first need your model number, which can be found on the underside of your product beneath the safety warning label.&nbsp;</p>\n<p dir="ltr">It should look something like the following: XX.XXXXX.X</p>\n<p dir="ltr">Once you send it over, I will advise on next steps.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks!</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
                },
                {
                    title: 'Support escalation',
                    content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We have escalated your ticket {{Ticket.Number}} to second-level support.</p>\n<p dir="ltr">You should hear back from the new agent on your case, {{NewAgent.FirstName}}, shortly.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks,</p>\n<p dir="ltr">{{Company.Name}} Customer Support</p>'
                }
            ]
        }
    ];
    const mergetags_list = [
        {
            title: 'Example merge tags list',
            menu: [
                {
                    value: 'Example.1',
                    title: 'Example one'
                },
                {
                    value: 'Example.2',
                    title: 'Example two'
                }
            ]
        }
    ];

    const alatTesList = [
        {
            id: 1,
            name: 'Kepribadian'
        },
        {
            id: 1,
            name: 'Intelegensi'
        },
    ]

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [alatTes, setAlatTes] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [detail, setDetail] = useState('')

    const handleChangeAlatTes = (event: SelectChangeEvent<typeof alatTes>) => {
        const {
            target: { value },
        } = event;

        setAlatTes(value);
    };

    const imageRef = useRef<HTMLInputElement>(null);
    const showOpenFileDialog = () => {
        imageRef.current?.click();
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    return (
        <Layout>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackbarLocal.isOpen} autoHideDuration={6000} onClose={() => setShowSnackbarLocal({ isOpen: false, message: '', status: 'error' })}>
                <Alert
                    onClose={() => setShowSnackbarLocal({ isOpen: false, message: '', status: 'error' })}
                    className={(showSnackbarLocal.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackbarLocal.message}
                </Alert>
            </Snackbar>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/manajemen-tes/list-tes')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold pt-1">
                    Tambah Tes
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12} sx={{
                    '.tox-tinymce': {
                        width: '100%',
                        marginTop: '8px'
                    },
                }}>
                    <Stack spacing={3} padding={2} className='m-6'>
                        <Grid2 container>
                            <Typography className="w-full">Judul Tes <span className='text-danger-600'>*</span></Typography>
                            <TextField value={title} onChange={(data) => setTitle(data.target.value)} variant="outlined" className='mt-2 w-full'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="w-full">Alat Tes<span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={alatTes}
                                onChange={handleChangeAlatTes}
                                className='rounded-lg mt-2'
                                fullWidth
                            >
                                {alatTesList.map((data) => (
                                    <MenuItem
                                        key={data.id}
                                        value={data.id.toString()}
                                    >
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid2>
                        <Grid2 container>
                            <Typography className="w-full">Deskripsi Singkat <span className='text-danger-600'>*</span></Typography>
                            <TextField value={description} onChange={(data) => setDescription(data.target.value)} variant="outlined" className='mt-2 w-full'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Grid2 xs={12} md={6}>
                                <Typography className="w-full">Logo <span className='text-danger-600'>*</span> <span className='text-xs'>(Resolusi 64px x 64px)</span></Typography>
                                <Card sx={{
                                    border: '0px solid rgba(0, 0, 0, 0.20)',
                                    boxShadow: '0px 1px 2px 0px rgba(145, 158, 171, 0.16)',
                                    height: '104px',
                                    width: '104px',
                                }} className='bg-general-50 rounded-sm mt-2 justify-center flex align-center cursor-pointer' onClick={() => {
                                    showOpenFileDialog()
                                }}>
                                    {selectedFile || thumbnail
                                        ? <img src={preview ?? thumbnail} />
                                        : <CardContent className='justify-center text-center h-full mt-3'><Iconly name='Plus' />
                                            Upload
                                        </CardContent>
                                    }
                                    <input
                                        ref={imageRef}
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleChangeImage}
                                    />
                                </Card>
                            </Grid2>
                        </Grid2>
                        <Grid2 container>
                            <UseSwitchesCustom isActive={isActive} setIsActive={setIsActive} />
                            <Typography className="self-center ml-2">Active?</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography className="w-full">Detail Tes <span className='text-danger-600'>*</span></Typography>
                            <Editor
                                onEditorChange={(data) => setDetail(data)}
                                apiKey='kj0kcue53jef0knyqjm7d1ntw8ky4opr9n0f5o5k05wh24vv'
                                init={{
                                    contextmenu: 'advtemplate',
                                    menubar: false,
                                    plugins: 'accordion anchor preview importcss autolink charmap autosave save directionality code codesample emoticons image link lists media searchreplace table visualblocks wordcount visualchars fullscreen image pagebreak nonbreaking insertdatetime advlist help quickbars',
                                    // plugins: 'accordion anchor preview importcss autolink charmap autosave save directionality code codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode visualchars fullscreen editimage image advtemplate pagebreak nonbreaking mentions tinycomments tableofcontents insertdatetime advlist help footnotes quickbars mergetags autocorrect typography inlinecss markdown',
                                    content_style:
                                        "@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); body { font-family: Poppins; }; div { margin: 10px; border: 5px solid red; padding: 3px; }",
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Seov',
                                    promotion: false,
                                    branding: false,
                                    advtemplate_templates,
                                    mergetags_list,
                                    toolbar_mode: 'sliding',
                                    toolbar1: 'undo redo | bold italic underline | blocks fontfamily fontsize | link image media table',
                                    toolbar2: 'align lineheight numlist bullist checklist | outdent indent | strikethrough forecolor backcolor formatpainter removeformat superscript | code fullscreen preview',
                                    toolbar3: 'save print export | pagebreak anchor inserttemplate codesample footnotes mergetags | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck typography',
                                    statusbar: false,
                                }}
                                value={detail}
                            />
                        </Grid2>
                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white' >
                            Simpan
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout>
    );
}
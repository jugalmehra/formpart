import React,{ useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { makeGetRequest } from '../http-service';
import './form.css';



function Formpart(){

    const [doctordetails, setDoctordetails] = useState({
            name: '',
            speciality: '',
            experience: '',
            consultFees: '',
            qualification: '',
            practisingAt: '',
            languages: [],
            email: '',
            phone: '',
            gender: '',
            medicalRegistrationNumber: '',
            graduation: '',
            speciallization: '',
            superSpeciallization: ''
    });

    const [isdirty, setIsdirty] = useState({
        name: false,
        speciality: false,
        experience: false,
        consultFees: false,
        qualification: false,
        practisingAt: false,
        languages: false,
        email: false,
        phone: false,
        gender: false,
        medicalRegistrationNumber: false,
        graduation: false,
        speciallization: false,
        superSpeciallization: false
    });

    const [errors, setErrors] = useState({
            name: '',
            speciality: '',
            experience: '',
            consultFees: '',
            qualification: '',
            practisingAt: '',
            languages: [],
            email: '',
            phone: '',
            gender: '',
            medicalRegistrationNumber: '',
            graduation: '',
            speciallization: '',
            superSpeciallization: ''
    });

    const [specialities, setSpecialities] = useState([]);
    const languages = ['Hindi','English','Punjabi','Bengali','Marathi','Telugu','Tamil','Gujrati','Assamese','Kannada','Oriya','Malayalam'];

    //for getting all of the doctor detail
    useEffect(() => {
        makeGetRequest(
            'http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051',
            true,
            null
        )
        .then(res => {
            console.log('get doctor res: ', res.doctor)
            setDoctordetails({
                name: res.doctor.name.full,
                speciality: res.doctor._specialty.id,
                experience: res.doctor.experience,
                consultFees: res.doctor.fee,
                qualification: res.doctor.qualification,
                practisingAt: res.doctor.clinicOrHospitalName,
                languages: res.doctor.languages,
                email: res.doctor.email,
                phone: res.doctor.phone,
                gender: res.doctor.gender,
                medicalRegistrationNumber: res.doctor.registrationNumber,
                graduation: res.doctor.qualification,
                speciallization: res.doctor.specialty,
                superSpeciallization: res.doctor.superSpeciality
            })
            
        })
        .catch(err => {
            console.log(err)
            alert('somthing went wrong')
        })
        
        
    },[])

    // for getting all the specialities
    useEffect(() => {
        makeGetRequest(
            'http://178.128.127.115:3000/admin/v1/specialties',
            true,
            null
        )
        .then(res => {
            console.log('get specialties res: ', res)
            setSpecialities(res.specialties)
            
        })
        .catch(err => {
            console.log(err)
            alert('somthing went wrong')
        })
    },[])

    //handleonchangepart
     const handleonchange = (field, value) =>{
         console.log(field, value)
         if(field === 'languages'){
             if(value.checked){
                 doctordetails.languages.push(value.value)
                 setDoctordetails({...doctordetails})
             }else{      //doctorDetials[field].splice(doctorDetials[field].indexOf(value.value),1)
                doctordetails.languages.splice(languages.indexOf(value.value),1)
                setDoctordetails({...doctordetails})
             }

         }else{
        //  setDoctordetails({field: value})
        //setDoctordetails[field] = value
        setDoctordetails({...doctordetails,[field]:value})
        setIsdirty({...isdirty,[field]:true})
        console.log(isdirty)
        // validateform();
         }

     }

    //  useEffect(() => {
    //     validateform();
    //  },[isdirty])

     const validateform = () => {
         Object.keys(doctordetails).forEach((each) => {
             if(each === 'name' && isdirty.name){
                 if(!doctordetails.name.trim().length || doctordetails.name.trim().length < 3 ){
                     console.log("enter something")
                     setErrors({...errors,[each]: 'must contain value and no. of characters has to be greater than 3'})
                     
                 }else{
                     setErrors({...errors,name:''})
                     setIsdirty({...isdirty,[each]:false})
                 }
             }

             else if(each === 'experience' && isdirty.experience){
                if(!doctordetails.experience || doctordetails.experience < '0'){
                    setErrors({...errors,experience: 'experience cannot be empty and it cannot be negative value'})
                    // setIsdirty({...isdirty,[each]:'true'})
                }else{
                    setErrors({...errors,[each]:''})
                    setIsdirty({...isdirty,[each]:false})

                }
             }

             else if(each === 'speciality' && isdirty.experience){
                 if(!doctordetails.speciality.trim().length){
                    setErrors({...errors,speciality:'required'})
                    // setIsdirty({...isdirty,[each]:'true'})
                 }else{
                    setErrors({...errors,[each]:''})
                    setIsdirty({...isdirty,[each]:false})
                 }
             }

             else if(each === 'consultFees' && isdirty.consultFees){
                 if(!doctordetails.consultFees || doctordetails.consultFees < '0' ){
                    setErrors({...errors,consultFees:'Fees cannot be empty and it cannot be a negative value'})
                    // setIsdirty({...isdirty,[each]:'true'})
                 }else{
                    setErrors({...errors,[each]:''})
                    setIsdirty({...isdirty,[each]:false})
                 }
             }

             else if(each === 'qualification' && isdirty.qualification){
                 if(!doctordetails.qualification.trim().length){
                    setErrors({...errors,qualification:'required'})
                    // setIsdirty({...isdirty,[each]:'true'})
                 }else{
                    setErrors({...errors,qualification:''})
                    setIsdirty({...isdirty,qualification:false})
                 }
             }
             else if(each === 'practisingAt' && isdirty.practisingAt ){
                if(!doctordetails.practisingAt.trim().length){
                    setErrors({...errors,practisingAt:'required'})
                }else{
                    setErrors({...errors,practisingAt:''})
                    setIsdirty({...isdirty,practisingAt:false})
                }
             }

             else if(each === 'medicalRegistrationNumber' || isdirty.medicalRegistrationNumber ){
                 if(!doctordetails.medicalRegistrationNumber.length){
                     setErrors({...errors,medicalRegistrationNumber:'required'})
                 }else{
                     setErrors({...errors,medicalRegistrationNumber:''})
                     setIsdirty({...isdirty,medicalRegistrationNumber:false})
                 }
             }

         })
     }



     //making specialities option in the form
    const specialtiesitems = specialities.map( spec => {
        return <option key={spec.id} value={spec.id}>{spec.name}</option>
    })

    //making languages checkboxs in the form
    const languagecheckkboxes = languages.map( lan => {
        return(
            <div className="internalcheckbox">
                <label>
                    <Input type="checkbox" value={lan} checked={doctordetails.languages.includes(lan)?true:false} onChange={(e) => {
                        handleonchange("languages",e.target)
                    }} />{' '}{lan}
                </label>
            </div>
        );
    })

    return(
        <>
            <Form>
                <Label>Name</Label>
                <Input type="text" name="name" placeholder="enter a name" value={doctordetails.name} onChange={(e) => {
                    handleonchange("name",e.target.value.trim())
                }} />
                {errors.name && (
                                <div>{errors.name}</div>
                                )}

                <br/>

                <Label>Speciality</Label>
                <Input type="select" name="speciality" value={doctordetails.speciality} onChange={(e) => {
                    handleonchange("speciality",e.target.value)
                }} >
                <option value="">Select Specialities</option>

                {specialtiesitems}
                
                </Input><br/>

                <Label>Experience</Label>
                <Input type="Number" name="experience" placeholder="value" value={doctordetails.experience} onChange={(e) => {
                    handleonchange("experience", e.target.value)
                }} /><br/>


                <Label>Consult Fee</Label>
                <Input type="Number" name="consultFees" placeholder="enter fee" value={doctordetails.consultFees} onChange={(e) => {
                    handleonchange("consultFees",e.target.value)
                }} /><br/>


                <Label>Qualification</Label>
                <Input type="text" name="qualification" placeholder="enter qualification" value={doctordetails.qualification} onChange={(e) => {
                    handleonchange("qualification",e.target.value.trim())
                }} /><br/>


                <Label>Practising At</Label>
                <Input type="text" name="practisingAt" placeholder="Enter a Practising At" value={doctordetails.practisingAt} onChange={(e) => {
                    handleonchange("practisingAt",e.target.value)
                }} /><br/>


                <Label>Languages</Label>
                <div className="languagecheckbox">
                {languagecheckkboxes}<br/>
                </div>

                <Label>Email</Label>
                <Input type="email" name="email" placeholder="enter your email" value={doctordetails.email} onChange={(e) => {
                    handleonchange("email",e.target.value.trim())
                }} /><br/>


                <Label>Phone</Label>
                <Input type="number" name="phone" placeholder="enter phone number" value={doctordetails.phone} onChange={(e) => {
                    handleonchange("phone",parseInt(e.target.value))
                }} /><br/>


                <Label>Gender</Label><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Label><Input type="radio" name="gender" value="Male" checked={doctordetails.gender==='Male'?true:false} onChange={(e) => {
                    handleonchange("gender",e.target.value)
                }} />male</Label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Label><Input type="radio" name="gender" value="Female"  checked={doctordetails.gender==='Female'?true:false} onChange={(e) => {
                    handleonchange("gender",e.target.value)
                }} />Female</Label><br/>


                <Label>Medical Registration Number</Label>
                <Input type="text" name="medicalRegistrationNumber" placeholder="enter registration number" value={doctordetails.medicalRegistrationNumber} onChange={(e) => {
                    handleonchange("medicalRegistrationNumber",e.target.value.trim())
                }} /><br/>


                <Label>Graduation</Label>
                <Input type="textarea" name="graduationtext" value={doctordetails.graduation} onChange={(e) => {
                    handleonchange("graduation",e.target.value.trim())
                }} />


                <Label>Specialization</Label>
                <Input type="textarea" name="specializationtext" value={doctordetails.speciallization} onChange={(e) => {
                    handleonchange("speciallization",e.target.value.trim())
                }} />


                <Label>Super Specialization</Label>
                <Input type="textarea" name="superSpecialization" value={doctordetails.superSpeciallization} onChange={(e) => {
                    handleonchange("superSpeciallization",e.target.value.trim())
                }} />


            </Form>
        </>
    );
}

export default Formpart;
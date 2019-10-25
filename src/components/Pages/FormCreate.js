import React, { useState } from 'react';
import _ from 'lodash';
import { createForm } from '../../actions';
import { connect } from 'react-redux';

function FormCreate(props) {
    const intitalState = {
        userName: { firstName: '', lastName: '' },
        gender: '',
        birthday: { date: '', month: '', year: '' },
        contects: { cellNumber: '', email: '' },
        vote: ''
    }

    const intitalArray = [
        "userName-firstName",
        "userName-lastName",
        "birthday-date",
        "birthday-month",
        "birthday-year",
        "gender",
        "contects-cellNumber",
        "contects-email",
        "vote"
    ]

    const voteOption = ["Apple", "Butter", "Charlie"]

    const [form, setForm] = useState(intitalState)

    const [formError, setFormError] = useState(intitalState)

    const [isValidArray, setIsValid] = useState(intitalArray)

    const updateField = e => {
        let keyName = e.target.name
        let value = e.target.value
        if (e.target.name.includes('-')) {
            let nestedKeyName = keyName.split('-')[1]
            keyName = keyName.split('-')[0]

            setForm({
                ...form,
                [keyName]: {
                    ...form[keyName],
                    [nestedKeyName]: value
                }
            });

        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    const isValid = (e, manualKeyName) => {
        let value = e.target.value
        let keyName = _.isUndefined(e.target.name) ? manualKeyName : e.target.name
        let tempArray = [...isValidArray]

        if (_.isEmpty(value)) {
            let errorMessage = "This is required"
            setFormErrorMessage(keyName, errorMessage)
            tempArray.indexOf(keyName) === -1 && tempArray.push(keyName);

        } else {
            let errorMessage = ''
            setFormErrorMessage(keyName, errorMessage)
            let index = tempArray.indexOf(keyName)
            index !== -1 && tempArray.splice(index, 1)
        }
        setIsValid(tempArray)
    }


    function setFormErrorMessage(keyName, errorMessage) {
        if (keyName.includes('-')) {
            let nestedKeyName = keyName.split('-')[1]
            keyName = keyName.split('-')[0]

            setFormError({
                ...formError,
                [keyName]: {
                    ...formError[keyName],
                    [nestedKeyName]: errorMessage
                }
            });
        } else {
            setFormError({ ...formError, [keyName]: errorMessage });
        }

    }

    const SubmitValidation = () => {
        const em = 'This is required'
        const fl = ''

        let result = intitalArray.map((value, i) =>
            isValidArray.indexOf(intitalArray[i]) !== -1 ? true : false
        )

        const logic = (index) => { return result[index] ? em : fl }

        const failState = {
            userName: {
                firstName: logic(0),
                lastName: logic(1)
            },
            gender: logic(2),
            birthday: {
                date: logic(3),
                month: logic(4),
                year: logic(5)
            },
            contects: {
                cellNumber: logic(6),
                email: logic(7)
            },
            vote: logic(8)
        }
        setFormError(failState)
    }

    const printValues = e => {
        e.preventDefault();
        SubmitValidation();

        if (_.isEmpty(isValidArray)) {
            props.createForm(form)
        } else console.log("submit fail")
    };


    const runMe = () => {

        console.log(form)

    }

    return (
        <div className="ui container">
            <br />
            <h1 className="ui center aligned header">Voting Form</h1>
            <br />
            <div className="ui form">
                <form onSubmit={printValues} noValidate>
                    <h2 className="ui center aligned dividing header">Personal Information</h2><br />
                    <div className="two fields">
                        <div className={`field ${_.isEmpty(formError.userName.firstName) || 'error'} `}>
                            <label>Name</label>
                            <input
                                placeholder="First Name"
                                name="userName-firstName"
                                value={form.userName.firstName}
                                onChange={updateField}
                                onBlur={isValid}
                                onSubmit={isValid}
                            />
                            <label>{formError.userName.firstName}</label>
                        </div>
                        <div className={`field ${_.isEmpty(formError.userName.lastName) || 'error'} `}>
                            <label>Surname</label>
                            <input placeholder="Last Name"
                                name="userName-lastName"
                                value={form.userName.lastName}
                                onChange={updateField}
                                onBlur={isValid}
                            />
                            <label>{formError.userName.lastName}</label>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field " >
                            <label>Date of Birth</label>
                            <div className="three fields">
                                <div className={`field ${_.isEmpty(formError.birthday.date) || 'error'}`}>
                                    <input
                                        placeholder="Date"
                                        type="number"
                                        min="1"
                                        max="31"
                                        name="birthday-date"
                                        value={form.birthday.date}
                                        onChange={updateField}
                                        onBlur={isValid}
                                    />
                                    <label>{formError.birthday.date}</label>
                                </div>
                                <div className={`field ${_.isEmpty(formError.birthday.month) || 'error'}`}>
                                    {monthSelector(form, updateField, isValid)}
                                    <label>{formError.birthday.month}</label>
                                </div>
                                <div className={`field ${_.isEmpty(formError.birthday.year) || 'error'}`}>
                                    <input
                                        placeholder="Year"
                                        type="number"
                                        name="birthday-year"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={form.birthday.year}
                                        onChange={updateField}
                                        onBlur={isValid}
                                    />
                                    <label>{formError.birthday.year}</label>
                                </div>
                            </div>
                        </div>
                        <div className={`field ${_.isEmpty(formError.gender) || 'error'}`}>
                            <label>Gender</label>
                            <div className="inline fields " onChange={(e) => { updateField(e); isValid(e) }}>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="gender" value="Male" />
                                        <label>Male</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="gender" value="Female" />
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                            <div>{formError.gender}</div>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className={`field ${_.isEmpty(formError.contects.cellNumber) || 'error'}`}>
                            <label>Mobile Number</label>
                            <input placeholder="Number only"
                                type="tel"
                                pattern="\d+"
                                name="contects-cellNumber"
                                value={form.contects.cellNumber}
                                onChange={updateField}
                                onBlur={isValid}
                            />
                        </div>
                        <div className={`field ${_.isEmpty(formError.contects.email) || 'error'}`}>
                            <label>Email Address</label>
                            <input placeholder="Email Address"
                                type="email"
                                name="contects-email"
                                value={form.contects.email}
                                onChange={updateField}
                                onBlur={isValid}
                            />
                        </div>
                    </div>
                    <div className={`field ${_.isEmpty(formError.vote) || 'error'}`}>
                        <label htmlFor="vote">Please vote here</label>
                        {renderVoteOption(voteOption, updateField, isValid)}
                    </div>
                    <div className="ui right floated menu">
                        <button className="ui button positive" type="button" onClick={runMe}>Run me</button>
                        <button type="submit" className="ui animated button" tabIndex="0" onClick={printValues}>
                            <div className="visible content">submit</div>
                            <div className="hidden content"><i className="right arrow icon" /></div>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};




const renderVoteOption = (voteOption, updateField, isValid) => {

    return (
        <div className="inline fields" onChange={(e) => { updateField(e); isValid(e) }}  >
        {voteOption.map((option, i) => {
            return(
                <div className="field" key={i}>
                    <div className="ui radio checkbox">
                        <input type="radio" name="vote" value={option}  />
                        <label>{option}</label>
                    </div>
                </div>
            );
        })}
        </div>
    );
}

const monthSelector = (form, updateField, isValid) => {

    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    return (
        <select className="ui dropdown"
            name="birthday-month"
            value={form.birthday.month}
            onChange={updateField}
            onBlur={isValid}
        >
            <option disabled hidden value="">Month</option>
            {months.map((month, i) =>
                <option key={i} value={i + 1}>
                    {month}
                </option>
            )}
        </select>
    );
};

export default connect(null, { createForm })(FormCreate);
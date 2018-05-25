import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input'

import classes from './CustomerData.css';

class CustomerData extends Component {
    state = {
        generalDetailsForm : {
            type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'TYPE'
            },
            alternateCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'ALTERNATE CODE'
            },
            shortName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'ALTERNATE CODE'
            },
            parent: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'ALTERNATE CODE'
            }
        },
        locationDetailsForm: {
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ADDRESS'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'ALTERNATE CODE'
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CITY'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false,
                label:'ALTERNATE CODE'
            },
            state: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        }
    }


    checkValidity(value, rules){
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedGeneralDetails = {
            ...this.state.generalDetailsForm
        };
        const updatedGeneralDetailsElement = { 
            ...updatedGeneralDetails[inputIdentifier]
        };

        updatedGeneralDetailsElement.value = event.target.value;
        updatedGeneralDetailsElement.valid = this.checkValidity(updatedGeneralDetailsElement.value, updatedGeneralDetailsElement.validation);
        updatedGeneralDetailsElement.touched = true;
        updatedGeneralDetails[inputIdentifier] = updatedGeneralDetailsElement;

        this.setState({generalDetailsForm: updatedGeneralDetails});
    }

    inputChangedHandler1 = (event, inputIdentifier) => {
        const updatedLocation = {
            ...this.state.locationDetailsForm
        };
        const updatedLocationElement = { 
            ...updatedLocation[inputIdentifier]
        }; 

        updatedLocationElement.value = event.target.value;
        updatedLocationElement.valid = this.checkValidity(updatedLocationElement.value, updatedLocationElement.validation);
        updatedLocationElement.touched = true;
        updatedLocation[inputIdentifier] = updatedLocationElement;
        this.setState({locationDetailsForm: updatedLocation});
    }


    test(formElement){
        return(<div className={classes.inputFields}>
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            { (formElement.config.touched && !formElement.config.valid) ? <div>Invalid format!!</div>: ''}
        </div>)
        
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.generalDetailsForm) {
            formData[formElementIdentifier] = this.state.generalDetailsForm[formElementIdentifier].value;
        }

        for (let formElementIdentifier in this.state.locationDetailsForm) {
            formData[formElementIdentifier] = this.state.locationDetailsForm[formElementIdentifier].value;
        }
        alert(JSON.stringify(formData));

    }
    render(){
        const generalFields = [];
        for (let key in this.state.generalDetailsForm) {
            generalFields.push({
                id: key,
                config: this.state.generalDetailsForm[key]
            });
        }
        let form1 = generalFields.map(formElement => (
            this.test(formElement)
        ));
        const locationFields= [];
            for (let key in this.state.locationDetailsForm){
                locationFields.push({
                    id: key,
                    config: this.state.locationDetailsForm[key]
                });
            }

            let form2 = (locationFields.map(formElement => (
                <div className={classes.inputFields}>
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler1(event, formElement.id)} />
        </div>
            )));
        return(
        <div>
            <div className={classes.InboxDiv}>Inbox components</div>
            <div className={classes.formDiv}>
                <h2>CUSTOMER DETAILS</h2>
            <form onSubmit={this.orderHandler}>
                <p>GENERAL</p>
                <div className={classes.generalBlock}>
                    {form1} 
                </div>
                <p>LOCATION / CONTACT</p> 
                {form2}
                <button btnType="Success" >Save</button>
            </form>
            </div>
        </div>);
    }
   
}

export default CustomerData;
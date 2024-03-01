import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';

export const Register = ({ navigation }) => {
    const [id, setId] = useState(1);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingData = await AsyncStorage.getItem('employeeData');
                if (existingData) {
                    const data = JSON.parse(existingData);
                    const maxId = Math.max(...data.map(item => item.id), 0);
                    setId(maxId + 1);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onChange = (event, selectedValue) => {
        if (selectedValue) {
            setSelectedDate(selectedValue);
            setShow(false);
        }
    };

    const handleSubmit = async () => {
        if (!name || !gender || !category || !selectedDate) {
            Alert.alert('Missing Information', 'Please fill in all fields.');
            return;
        }

        try {
            const newData = {
                id: id,
                name: name,
                gender: gender,
                category: category,
                dateOfBirth: selectedDate.toISOString().split('T')[0], 
            };
            const existingData = await AsyncStorage.getItem('employeeData');
            const data = existingData ? JSON.parse(existingData) : [];
            data.push(newData);
            await AsyncStorage.setItem('employeeData', JSON.stringify(data));
            navigation.navigate("Home");

            console.log("Data Successfully added", data);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const options = [{ key: '1', label: "Jr. Developer" }, { key: '2', label: "Sr. Developer" }];

    const showMode = modeToShow => {
        setShow(true);
        setMode(modeToShow);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Candidate Registration</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="black"
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Gender</Text>
                <View style={styles.checkboxContainer}>
                    <Checkbox label="Male" checked={gender === 'Male'} onPress={() => setGender('Male')} />
                    <Checkbox label="Female" checked={gender === 'Female'} onPress={() => setGender('Female')} />
                </View>
            </View>
           
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Date of Birth</Text>
                <View style={styles.calenderBox}>
                    <TextInput
                        style={[styles.title,{marginLeft:40}]}
                        value={selectedDate.toLocaleDateString()} // Use selectedDate state
                        onFocus={() => showMode('date')}
                        editable={false}
                    />
                    <TouchableOpacity onPress={() => showMode('date')}>
                        <View>
                            <Text style={styles.calenderIcon}>📅</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                
                {show && (
                    <DateTimePicker
                        value={selectedDate} 
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.title}>Category</Text>
                <ModalSelector
                    style={styles.input}
                    data={options}
                    initValue="Select Category"
                    initValueTextStyle={{ color: "black" }}
                    onChange={itemValue => setCategory(itemValue.label)}
                />
            </View>
            <View style={styles.BtnContainer}>
                <Button style={styles.submitBtn} title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const Checkbox = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Text style={styles.checkmark}></Text>}
            </View>
            <Text style={styles.checkboxText}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    titleText:{
        fontSize:20,
        margin: "auto",
        fontWeight: "bold",
        color: "black",
        marginHorizontal: "15%",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        width: "80%",
        color:"black"
    },
    title: {
        color: "black",
        width: "20%",
        marginRight: 5,
        fontSize: 15,
        fontWeight: "bold"
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,
        marginTop:5
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'black',
    },
    checkmark: {
        color: 'white',
        fontSize: 18,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
    },
    calenderBox:{
        flexDirection: "row",
        width:"200%",
    },
    calenderIcon:{
        fontSize:30
    },
    BtnContainer:{
        marginTop: 20,
    },
});

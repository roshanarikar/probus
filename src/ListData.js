import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ListData = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('employeeData');
                if (storedData) {
                    setEmployeeData(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>ID</Text>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Gender</Text>
            <Text style={styles.headerText}>Category</Text>
            <Text style={styles.headerText}>Date of Birth</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.cell,{marginRight:-10}]}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.gender}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={styles.cell}>{item.dateOfBirth}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Candidate List</Text>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={employeeData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        padding: 8,
        borderWidth: 1,
        paddingLeft: -10,
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: "black"
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        padding: 7,
        marginLeft: -35,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: "black"
    },
});

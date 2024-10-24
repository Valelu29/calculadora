import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { create, all } from 'mathjs';

const math = create(all);

// Función para convertir grados a radianes
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      // Reemplazar sin, cos, tan para convertir grados a radianes
      const modifiedInput = input
        .replace(/sin\((\d+)\)/g, (_, degrees) => `sin(${degreesToRadians(parseFloat(degrees))})`)
        .replace(/cos\((\d+)\)/g, (_, degrees) => `cos(${degreesToRadians(parseFloat(degrees))})`)
        .replace(/tan\((\d+)\)/g, (_, degrees) => `tan(${degreesToRadians(parseFloat(degrees))})`)
        .replace(/(\d+)%/g, (_, number) => `(${number} / 100)`); // Manejar porcentaje

      const evaluatedResult = math.evaluate(modifiedInput);
      setResult(evaluatedResult.toString());
    } catch (error) {
      console.error(error); // Para ver el error en la consola
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculadora Científica</Text>
      <TextInput style={styles.input} value={input} placeholder="0" editable={false} />
      <Text style={styles.result}>{result}</Text>
      <View style={styles.buttonsContainer}>
        {/* Botones numéricos */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <TouchableOpacity key={num} style={styles.button} onPress={() => handleInput(num.toString())}>
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={clearInput}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>

        {/* Operaciones básicas */}
        {['+', '-', '*', '/', '^', '(', ')'].map(op => (
          <TouchableOpacity key={op} style={styles.button} onPress={() => handleInput(op)}>
            <Text style={styles.buttonText}>{op}</Text>
          </TouchableOpacity>
        ))}

        {/* Botones para funciones trigonométricas */}
        <TouchableOpacity style={styles.button} onPress={() => handleInput('sin(')}>
          <Text style={styles.buttonText}>sin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('cos(')}>
          <Text style={styles.buttonText}>cos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('tan(')}>
          <Text style={styles.buttonText}>tan</Text>
        </TouchableOpacity>

        {/* Botones para raíz cuadrada y logaritmo natural */}
        <TouchableOpacity style={styles.button} onPress={() => handleInput('sqrt(')}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('log(')}>
          <Text style={styles.buttonText}>log</Text>
        </TouchableOpacity>

        {/* Botón para euler y pi */}
        <TouchableOpacity style={styles.button} onPress={() => handleInput('e')}>
          <Text style={styles.buttonText}>e</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('pi')}>
          <Text style={styles.buttonText}>π</Text>
        </TouchableOpacity>

        {/* Botón para porcentaje */}
        <TouchableOpacity style={styles.button} onPress={() => handleInput('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>

        {/* Botón para calcular el resultado */}
        <TouchableOpacity style={styles.button} onPress={calculateResult}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>

        {/* Botón para el punto decimal */}
        <TouchableOpacity style={styles.button} onPress={() => handleInput('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#96c3eb',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 36,
    textAlign: 'right',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  result: {
    fontSize: 50,
    textAlign: 'right',
    marginBottom: 20,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '22%',
    margin: '1%',
    padding: 20,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default App;

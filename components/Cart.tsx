import { Text } from '@/components/Text';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

export default function Cart(props: any) {
  const { isOpen, close } = props;

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Крестик */}
          <Pressable style={styles.closeButton} onPress={close}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          {/* Контент */}
          <Text style={styles.modalText}>Это корзина товаров</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openButton: {
    padding: 12,
    backgroundColor: '#0069a8',
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // затемнение фона
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50 // место для крестика
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalText: {
    marginTop: 80,
    textAlign: 'center',
    fontSize: 20
  }
});

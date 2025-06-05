import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'mobile-core';
type Props = {
  onUpdate: () => void;
  interval?: number;
  updateStep: {step: number; remoteName: string};
};

export function UpdateNotificationBar({
  onUpdate,
  interval = 1000,
  updateStep,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));
  const name = String(updateStep.remoteName).replace('Mobile', '');
  // @ts-ignore react native can't recognise this

  useEffect(() => {
    const timer = setInterval(() => {
      showNotification();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const showNotification = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  const hideNotification = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  const handleUpdate = () => {
    hideNotification();
    onUpdate();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.content}>
        {updateStep.step === 1 && (
          <ActivityIndicator size="small" color="#FFFFFF" />
        )}
        <Text style={styles.message}>
          {updateStep.step === 0
            ? 'Check for application updates'
            : updateStep.step === 1
              ? `Checking for updates...`
              : updateStep.step === 2
                ? `Module ${name} has a new update - exit the app to update it now? `
                : ''}
        </Text>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>
            {updateStep.step === 0 ? 'CHECK' : 'EXIT'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={hideNotification}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    zIndex: 1000,
    backgroundColor: '#000000',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
  updateButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '300',
  },
});

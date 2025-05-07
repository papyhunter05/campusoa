// Palette de couleurs extraite de Login.css
export const colors = {
    globalLight: '#ffffff',
    primaryColor: '#4f48ec',
    primaryLight: '#7a74ff',
    primaryDark: '#3931c9',
    secondaryColor: '#ffbf18',
    secondaryLight: '#ffd45e',
    secondaryDark: '#e6a800',
    complementaryColor: '#100e34',
    complementaryLight: '#1d1a5c',
    textColor: '#333333',
    textLight: '#666666',
    borderColor: '#e2e8f0',
    shadowColor: 'rgba(16, 14, 52, 0.1)',
    errorBg: '#fee2e2',
    errorText: '#b91c1c',
    successColor: '#22c55e',
    highlightColor: 'rgba(79, 72, 236, 0.2)',
    inputBg: '#f9fafb',
  };
  
  // Animations
  export const animations = {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    slideIn: `
      @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `,
    pulse: `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `,
  };
  
  // Classes CSS communes
  export const commonStyles = {
    card: `
      background-color: ${colors.globalLight};
      border-radius: 16px;
      box-shadow: 0 10px 30px ${colors.shadowColor};
      padding: 24px;
      border: 1px solid rgba(226, 232, 240, 0.5);
      transition: all 0.3s ease;
    `,
    heading: `
      color: ${colors.complementaryColor};
      font-weight: bold;
      margin-bottom: 8px;
    `,
    subheading: `
      color: ${colors.textLight};
      margin-bottom: 20px;
    `,
    input: `
      padding: 12px 16px;
      border: 1px solid ${colors.borderColor};
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.2s;
      background-color: ${colors.inputBg};
      color: ${colors.complementaryColor};
      width: 100%;
    `,
    inputFocus: `
      border-color: ${colors.primaryColor};
      outline: none;
      box-shadow: 0 0 0 3px ${colors.highlightColor};
      background-color: ${colors.globalLight};
    `,
    button: `
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    `,
    primaryButton: `
      background-color: ${colors.primaryColor};
      color: white;
      border: none;
      &:hover {
        background-color: ${colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(79, 72, 236, 0.3);
      }
      &:active {
        transform: translateY(0);
        box-shadow: none;
      }
    `,
    secondaryButton: `
      background-color: ${colors.secondaryColor};
      color: ${colors.complementaryColor};
      border: none;
      &:hover {
        background-color: ${colors.secondaryDark};
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(255, 191, 24, 0.3);
      }
    `,
    outlineButton: `
      background-color: transparent;
      color: ${colors.primaryColor};
      border: 1px solid ${colors.primaryColor};
      &:hover {
        background-color: ${colors.highlightColor};
        transform: translateY(-2px);
      }
    `,
    dangerButton: `
      background-color: ${colors.errorBg};
      color: ${colors.errorText};
      border: none;
      &:hover {
        background-color: #fecaca;
        transform: translateY(-2px);
      }
    `,
    table: `
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px ${colors.shadowColor};
    `,
    tableHeader: `
      background-color: ${colors.complementaryColor};
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.5px;
    `,
    tableCell: `
      padding: 16px;
      border-bottom: 1px solid ${colors.borderColor};
    `,
    badge: `
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `,
  };
  
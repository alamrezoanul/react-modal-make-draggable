# 🖱️ react-modal-make-draggable

Make **any React modal or `div` element draggable** with ease.

This library provides a simple `DraggableWrapper` component that allows you to wrap modals or custom components and drag them freely around the screen.

---

## 📦 Installation

```bash
npm install react-modal-make-draggable
or with Yarn:

yarn add react-modal-make-draggable

✨ Features
✅ Drag any custom div or popup component

✅ Seamless integration with react-modal

✅ Zero external dependencies (other than React)

✅ Easy to plug into existing projects

🚀 Usage
🔹 Basic Example with react-modal

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { DraggableWrapper } from 'react-modal-make-draggable';

ReactModal.setAppElement('#root');

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <ReactModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            inset: 'unset',
            padding: 0,
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        <DraggableWrapper>
          <div
            style={{
              width: '400px',
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            <h2>Drag Me</h2>
            <p>This modal can be dragged around the screen.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </DraggableWrapper>
      </ReactModal>
    </>
  );
};

export default App;
🧰 API
<DraggableWrapper>
Prop	Type	Description
children	ReactElement	The element or modal content to make draggable

Wrap your draggable content in this component. It uses position: fixed and manages left/top styles on drag.

💡 Tips
Dragging starts from any part of the wrapped content.
For precision, you can customize it to use a specific "handle" area.

Ideal for react-modal, custom modals, tooltips, or popovers.

CSS transform is automatically managed during drag.

📄 License
MIT © [Your Name]

🌟 Star This Project
If you find this package helpful, consider starring it on GitHub! It helps others discover it.

---
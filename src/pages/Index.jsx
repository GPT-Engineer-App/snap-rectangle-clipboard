import ScreenshotTool from '../components/ScreenshotTool';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Screenshot Tool</h1>
        <p className="text-xl text-gray-600 mb-6">Click the button below to take a screenshot of any area on this page!</p>
        <ScreenshotTool />
      </div>
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How to use:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click the "Take Screenshot" button</li>
          <li>Click and drag to select the area you want to capture</li>
          <li>Release the mouse button to save the screenshot</li>
          <li>Press ESC to cancel the selection</li>
        </ol>
      </div>
    </div>
  );
};

export default Index;

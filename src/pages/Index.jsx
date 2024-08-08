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
          <li>Click and hold to select the area you want to capture</li>
          <li>Hold for about half a second to automatically take the screenshot</li>
          <li>Release the mouse button before half a second to cancel</li>
          <li>Press ESC at any time to cancel the selection</li>
        </ol>
      </div>
    </div>
  );
};

export default Index;

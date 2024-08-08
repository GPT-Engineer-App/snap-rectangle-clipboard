import ScreenshotTool from '../components/ScreenshotTool';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Clipboard Screenshot Tool</h1>
        <p className="text-xl text-gray-600 mb-6">Click the button below to take a screenshot of any area on this page and copy it to your clipboard!</p>
        <ScreenshotTool />
      </div>
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How to use:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click the "Take Screenshot" button</li>
          <li>Click and hold to select the area you want to capture</li>
          <li>Release the mouse button to capture the screenshot</li>
          <li>The screenshot will be automatically copied to your clipboard</li>
          <li>Press ESC at any time to cancel the selection</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          Tip: You can now paste the screenshot directly into other applications!
        </p>
      </div>
    </div>
  );
};

export default Index;

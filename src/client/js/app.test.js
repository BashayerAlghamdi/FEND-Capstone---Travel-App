// Import the js file to test
import { handleSubmit } from "./app"

test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeInstanceOf(Function);
});
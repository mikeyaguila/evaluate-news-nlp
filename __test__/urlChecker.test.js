// Import the js file to test
import { isValidURL } from "../src/client/js/urlChecker"

describe("Testing the submit functionality", () => {

    test("Testing the checkForURL() function", () => {
           // Test if inbput URl is a malformed/falsey input
           expect(isValidURL).toBeDefined();
})});

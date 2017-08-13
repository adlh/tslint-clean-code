import { TestHelper } from './TestHelper';

/**
 * Unit tests.
 */
describe('minClassCohesionRule', (): void => {
    const ruleName: string = 'min-class-cohesion';

    it('should pass on empty class', (): void => {
        const script: string = `
            class EmptyClass {
            }
        `;
        TestHelper.assertViolations(ruleName, script, []);
    });

    it('should pass on class with instance fields and no instance methods', (): void => {
        const script: string = `
            // classes with instance fields
            class ClassWithField {
                private field;
            }
        `;
        TestHelper.assertViolations(ruleName, script, []);
    });

    it('should pass on class with constructor parameters creating instance fields and no instance methods', (): void => {
        const script: string = `
            // classes with instance fields
            class ClassWithField {
                constructor(private field) {
                }
            }
        `;
        TestHelper.assertViolations(ruleName, script, []);
    });

    it('should fail on class without instance fields', (): void => {
        const script: string = `
            // classes without instance fields
            class ClassWithoutFields {
                private someMethod() {
                }
            }
        `;
        TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "The cohesion of the class is too low. This indicates a failure in the object model: ClassWithoutFields",
                "name": "file.ts",
                "ruleName": "min-class-cohesion",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });

    it('should pass on class with constructor parameters, instance fields, and instance method using all fields', (): void => {
        const script: string = `
            class CohesiveClass {
                constructor(private a: number) {
                }
                public b: number;
                public sum(): number {
                    return this.a + this.b;
                }
            }
        `;
        TestHelper.assertViolations(ruleName, script, []);
    });

    it('should pass on class with constructor parameters, instance fields, and instance method using all fields', (): void => {
        const script: string = `
            class HalfCohesiveClass {
                constructor(private a: number) {
                }
                public b: number;
                public getA(): number {
                    return this.a;
                }
                public getB(): number {
                    return this.b;
                }
            }
        `;
        TestHelper.assertViolations(ruleName, script, []);
    });

    it('should fail on class with constructor parameters, instance fields, and instance method using all fields', (): void => {
        const script: string = `
            class ThirdCohesiveClass {
                constructor(private a: number) {
                }
                public b: number;
                private c: number;
                public getA(): number {
                    return this.a;
                }
                public getB(): number {
                    return this.b;
                }
                public getC(): number {
                    return this.c;
                }
            }
        `;
        TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "The cohesion of the class is too low. This indicates a failure in the object model: ThirdCohesiveClass",
                "name": "file.ts",
                "ruleName": "min-class-cohesion",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });

});
const password = "password";
const hashedPassword = '$2b$04$QNf20BDeAk8zroS7purI9eV4.1EmYOPlnEKorvzpzcGXnyvMhyxI.'


export const test = async () => {
    const hash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4, // number between 4-31
      });

    const isMatch = await Bun.password.verify(password, hashedPassword, 'bcrypt');
    console.log(hash)
    console.log(isMatch)

}

test()

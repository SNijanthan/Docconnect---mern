import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  VStack,
  Heading,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod Schema
const signInSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Must be at least 2 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  gender: z.string().min(1, "Please select a gender"),
});

const LoginForm = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/auth/user/register`,
        data,
      );

      console.log(res.data);

      toast({
        title: "Account created 🎉",
        description: "Your account has been created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // ✅ Reset form after success
      reset();
    } catch (err) {
      console.error(err.response?.data || err.message);

      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      w={["90%", "70%", "35%"]}
      mx="auto"
      mt={[10, 16]}
      p={[6, 8]}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={["2xl", "3xl", "4xl"]}
        mb={[6, 8]}
      >
        Signup
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={[4, 6]} align="stretch">
          {/* Name */}
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} bg="gray.100" />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          {/* Email */}
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} type="email" bg="gray.100" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input {...register("password")} type="password" bg="gray.100" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {/* Gender */}
          <FormControl isInvalid={errors.gender}>
            <FormLabel>Gender</FormLabel>
            <Select
              {...register("gender")}
              placeholder="Select option"
              bg="gray.100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </Select>
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>

          {/* Submit */}
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting} // ✅ loading state
          >
            Signup
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;

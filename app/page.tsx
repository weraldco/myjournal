'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(2).max(100),
});

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold">My Journal App</h1>
			<span>Login to access the app</span>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Enter your username.." {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your password.."
										type="password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Login</Button>
				</form>
			</Form>
		</div>
	);
}

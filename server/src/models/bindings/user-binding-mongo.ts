import { IDBModel } from '../../commons/types';
import { User } from '../mongo-models';

const userModel: IDBModel<any> = {
	insert: async user => {
		const newUser = await new User({
			userName: user.userName,
			password: user.password,
			userLevel: user.userLevel,
		});

		return new Promise((resolve, reject) => {
			newUser.save((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},

	getById: async id => {
		const user: any = await User.findOne({ _id: id }).exec();
		if (!user._id) {
			throw new Error('No user found');
		}
		return {
			id: user._id.toString(),
			userName: user.userName,
			password: user.password,
			userLevel: user.userLevel,
		};
	},
	getAll: async () => {
		const users: any = await User.find({}).exec();

		return users.map(u => ({
			id: u._id.toString(),
			userName: u.userName,
			password: u.password,
			userLevel: u.userLevel,
		}));
	},

	deleteById: async data => {
		return new Promise((resolve, reject) => {
			User.findByIdAndDelete(data).exec((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},

	updateById: async data => {
		let setFields = {
			...data,
		};
		for (let prop in setFields) {
			if (setFields[prop] == undefined) {
				delete setFields[prop];
			}
		}

		const user = await User.findByIdAndUpdate(
			{
				_id: data.id,
			},
			setFields,
			{
				new: true,
			}
		).exec();

		return user;
	},

	getAllByItem: async id => {},
	getAllBySupplierStatus: async id => {},
	getAllByScheduleLine: async data => {},
};

export { userModel };

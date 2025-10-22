import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeftIcon } from 'lucide-react-native';
import { Link } from 'expo-router';
import { View } from 'react-native';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DeepPage() {
  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <View className="items-center gap-4">
        <Text className="text-center text-3xl font-bold">深层页面</Text>
        <Text className="text-center text-lg text-muted-foreground">
          恭喜！你已经成功进入了更深层的路由页面
        </Text>
        <Text className="text-center text-muted-foreground">这是一个演示深层路由的示例页面</Text>
      </View>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-row items-center gap-2">
            <Icon as={ArrowLeftIcon} size={20} />
            <Text>打开对话框</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              <Text>这是一个对话框</Text>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Text>这是一个对话框的描述</Text>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="flex-row items-center gap-2">
                <Text>关闭</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="flex-row items-center gap-2">
            <Icon as={ArrowLeftIcon} size={20} />
            <Text>打开AlertDialog</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Text>这是一个AlertDialog</Text>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <Text>这是一个AlertDialog的描述</Text>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>关闭</Text>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link href="../" asChild>
        <Button variant="outline" className="flex-row items-center gap-2">
          <Icon as={ArrowLeftIcon} size={20} />
          <Text>返回Tabs</Text>
        </Button>
      </Link>
    </View>
  );
}
